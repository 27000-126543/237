const Construction = require('../models/Construction');
const Order = require('../models/Order');

const STANDARD_PROGRESS_NODES = [
  { name: '水电改造', description: '水电管线铺设、开槽布线、水压测试', expectedDays: 7 },
  { name: '泥瓦工程', description: '墙体砌筑、地面找平、瓷砖铺贴、防水处理', expectedDays: 15 },
  { name: '木工工程', description: '吊顶安装、柜体制作、门窗套安装', expectedDays: 12 },
  { name: '油漆工程', description: '墙面刮腻子、乳胶漆涂刷、木器漆施工', expectedDays: 10 },
  { name: '安装工程', description: '地板铺设、洁具安装、灯具安装、五金安装', expectedDays: 8 },
  { name: '保洁清理', description: '全屋清洁、垃圾清运、成品保护', expectedDays: 3 },
  { name: '竣工验收', description: '各项指标检测、业主验收、问题整改', expectedDays: 5 }
];

const createConstruction = async (req, res) => {
  try {
    const { orderId, name, address, area, totalPrice, expectedDays } = req.body;
    const userId = req.user.id;

    const order = await Order.findOne({ _id: orderId, userId });
    if (!order) {
      return res.status(404).json({ message: '订单不存在' });
    }

    const existingConstruction = await Construction.findOne({ orderId });
    if (existingConstruction) {
      return res.status(400).json({ message: '该订单已创建施工项目' });
    }

    const progress = STANDARD_PROGRESS_NODES.map((node, index) => ({
      name: node.name,
      description: node.description,
      status: 'pending',
      expectedDays: node.expectedDays,
      order: index
    }));

    const timeline = [
      {
        title: '施工项目创建',
        description: '施工项目已创建，等待施工队竞标',
        status: 'completed',
        date: new Date()
      }
    ];

    const construction = new Construction({
      orderId,
      userId,
      name,
      address,
      area,
      totalPrice,
      expectedDays,
      status: 'bidding',
      progress,
      timeline
    });

    await construction.save();
    res.status(201).json({ message: '施工项目创建成功', construction });
  } catch (error) {
    res.status(500).json({ message: '创建施工项目失败', error: error.message });
  }
};

const getConstructionList = async (req, res) => {
  try {
    const userId = req.user.id;
    const userRole = req.user.role;
    const { status, page = 1, limit = 10 } = req.query;

    let query = {};
    if (userRole === 'owner') {
      query.userId = userId;
    } else if (userRole === 'constructor') {
      query['bids.constructorId'] = userId;
    }

    if (status) query.status = status;

    const constructions = await Construction.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate('userId', 'name avatar phone')
      .populate('constructorId', 'name avatar phone')
      .populate('orderId', 'orderNo type totalAmount');

    const total = await Construction.countDocuments(query);

    res.json({
      constructions,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: '获取施工项目列表失败', error: error.message });
  }
};

const getConstructionDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const userRole = req.user.role;

    let query = { _id: id };
    if (userRole === 'owner') {
      query.userId = userId;
    }

    const construction = await Construction.findOne(query)
      .populate('userId', 'name avatar phone')
      .populate('constructorId', 'name avatar phone')
      .populate('orderId', 'orderNo type totalAmount houseInfo')
      .populate('bids.constructorId', 'name avatar phone constructorProfile');

    if (!construction) {
      return res.status(404).json({ message: '施工项目不存在' });
    }

    res.json({ construction });
  } catch (error) {
    res.status(500).json({ message: '获取施工详情失败', error: error.message });
  }
};

const placeBid = async (req, res) => {
  try {
    const { id } = req.params;
    const constructorId = req.user.id;
    const { price, days, description } = req.body;

    if (req.user.role !== 'constructor') {
      return res.status(403).json({ message: '只有施工队可以竞标' });
    }

    const construction = await Construction.findById(id);
    if (!construction) {
      return res.status(404).json({ message: '施工项目不存在' });
    }

    if (construction.status !== 'bidding') {
      return res.status(400).json({ message: '当前状态不允许竞标' });
    }

    const existingBid = construction.bids.find(
      bid => bid.constructorId.toString() === constructorId
    );
    if (existingBid) {
      return res.status(400).json({ message: '您已对该项目提交过竞标' });
    }

    construction.bids.push({
      constructorId,
      price,
      days,
      description,
      status: 'pending'
    });

    await construction.save();
    res.json({ message: '竞标成功', construction });
  } catch (error) {
    res.status(500).json({ message: '竞标失败', error: error.message });
  }
};

const selectConstructor = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { bidId } = req.body;

    const construction = await Construction.findOne({ _id: id, userId });
    if (!construction) {
      return res.status(404).json({ message: '施工项目不存在' });
    }

    if (construction.status !== 'bidding') {
      return res.status(400).json({ message: '当前状态无法选择施工队' });
    }

    const selectedBid = construction.bids.id(bidId);
    if (!selectedBid) {
      return res.status(404).json({ message: '竞标记录不存在' });
    }

    construction.bids.forEach(bid => {
      bid.status = bid._id.toString() === bidId ? 'accepted' : 'rejected';
    });

    construction.constructorId = selectedBid.constructorId;
    construction.totalPrice = selectedBid.price;
    construction.expectedDays = selectedBid.days;
    construction.status = 'contract';

    construction.timeline.push({
      title: '施工队已选定',
      description: `已选定施工队，报价 ${selectedBid.price} 元，预计 ${selectedBid.days} 天完成`,
      status: 'completed',
      date: new Date()
    });

    await construction.save();
    res.json({ message: '施工队选定成功', construction });
  } catch (error) {
    res.status(500).json({ message: '选择施工队失败', error: error.message });
  }
};

const signContract = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const userRole = req.user.role;
    const { content, signature } = req.body;

    const construction = await Construction.findById(id);
    if (!construction) {
      return res.status(404).json({ message: '施工项目不存在' });
    }

    if (construction.status !== 'contract') {
      return res.status(400).json({ message: '当前状态无法签署合同' });
    }

    if (content) {
      construction.contract.content = content;
    }

    if (userRole === 'owner' && userId === construction.userId.toString()) {
      construction.contract.signedByOwner = true;
      construction.contract.ownerSignature = signature;
    } else if (userRole === 'constructor' && construction.constructorId && userId === construction.constructorId.toString()) {
      construction.contract.signedByConstructor = true;
      construction.contract.constructorSignature = signature;
    } else {
      return res.status(403).json({ message: '无权签署此合同' });
    }

    if (construction.contract.signedByOwner && construction.contract.signedByConstructor) {
      construction.contract.signedAt = new Date();
      construction.status = 'constructing';
      construction.startDate = new Date();
      
      const expectedEndDate = new Date();
      expectedEndDate.setDate(expectedEndDate.getDate() + construction.expectedDays);
      construction.expectedEndDate = expectedEndDate;

      if (construction.progress.length > 0) {
        construction.progress[0].status = 'in_progress';
        construction.progress[0].startDate = new Date();
      }

      construction.timeline.push({
        title: '合同已签署',
        description: '双方已签署施工合同，施工正式开始',
        status: 'completed',
        date: new Date()
      });
    }

    await construction.save();
    res.json({ message: '合同签署成功', construction });
  } catch (error) {
    res.status(500).json({ message: '签署合同失败', error: error.message });
  }
};

const updateProgress = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const userRole = req.user.role;
    const { progressIndex, status, description } = req.body;

    const construction = await Construction.findById(id);
    if (!construction) {
      return res.status(404).json({ message: '施工项目不存在' });
    }

    if (construction.status !== 'constructing') {
      return res.status(400).json({ message: '当前状态无法更新进度' });
    }

    const isConstructor = construction.constructorId && userId === construction.constructorId.toString();
    const isOwner = userId === construction.userId.toString();
    
    if (!isConstructor && !isOwner && userRole !== 'admin') {
      return res.status(403).json({ message: '无权更新施工进度' });
    }

    if (progressIndex < 0 || progressIndex >= construction.progress.length) {
      return res.status(400).json({ message: '无效的进度节点索引' });
    }

    const progressNode = construction.progress[progressIndex];

    if (status === 'in_progress' && progressIndex > 0) {
      const prevNode = construction.progress[progressIndex - 1];
      if (prevNode.status !== 'completed') {
        return res.status(400).json({ message: '上一个节点未完成，无法开始当前节点' });
      }
    }

    progressNode.status = status;
    if (description) {
      progressNode.description = description;
    }

    if (status === 'in_progress' && !progressNode.startDate) {
      progressNode.startDate = new Date();
    }

    if (status === 'completed') {
      progressNode.completedAt = new Date();
      progressNode.endDate = new Date();

      construction.timeline.push({
        title: `${progressNode.name}完成`,
        description: description || `施工节点「${progressNode.name}」已完成`,
        status: 'completed',
        date: new Date()
      });

      if (progressIndex + 1 < construction.progress.length) {
        construction.progress[progressIndex + 1].status = 'in_progress';
        construction.progress[progressIndex + 1].startDate = new Date();
      } else {
        construction.status = 'acceptance';
        construction.timeline.push({
          title: '施工完成，等待验收',
          description: '所有施工节点已完成，请业主组织验收',
          status: 'current',
          date: new Date()
        });
      }
    }

    await construction.save();
    res.json({ message: '进度更新成功', construction });
  } catch (error) {
    res.status(500).json({ message: '更新进度失败', error: error.message });
  }
};

const uploadPhoto = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { url, description } = req.body;

    const construction = await Construction.findById(id);
    if (!construction) {
      return res.status(404).json({ message: '施工项目不存在' });
    }

    const isConstructor = construction.constructorId && userId === construction.constructorId.toString();
    const isOwner = userId === construction.userId.toString();
    
    if (!isConstructor && !isOwner && req.user.role !== 'admin') {
      return res.status(403).json({ message: '无权上传照片' });
    }

    construction.photos.push({
      url,
      description,
      uploadedBy: userId
    });

    await construction.save();
    res.json({ message: '照片上传成功', construction });
  } catch (error) {
    res.status(500).json({ message: '上传照片失败', error: error.message });
  }
};

const submitReport = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { title, content, type } = req.body;

    const construction = await Construction.findById(id);
    if (!construction) {
      return res.status(404).json({ message: '施工项目不存在' });
    }

    construction.reports.push({
      title,
      content,
      type: type || 'normal',
      submittedBy: userId
    });

    await construction.save();
    res.json({ message: '监理报告提交成功', construction });
  } catch (error) {
    res.status(500).json({ message: '提交监理报告失败', error: error.message });
  }
};

const submitAcceptance = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const construction = await Construction.findById(id);
    if (!construction) {
      return res.status(404).json({ message: '施工项目不存在' });
    }

    const isConstructor = construction.constructorId && userId === construction.constructorId.toString();
    if (!isConstructor && req.user.role !== 'admin') {
      return res.status(403).json({ message: '只有施工队可以提交验收申请' });
    }

    if (construction.status !== 'acceptance') {
      return res.status(400).json({ message: '当前状态无法提交验收' });
    }

    construction.timeline.push({
      title: '验收申请已提交',
      description: '施工队已提交竣工验收申请，请业主安排验收',
      status: 'current',
      date: new Date()
    });

    await construction.save();
    res.json({ message: '验收申请提交成功', construction });
  } catch (error) {
    res.status(500).json({ message: '提交验收失败', error: error.message });
  }
};

const confirmAcceptance = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { items, passed, remark } = req.body;

    const construction = await Construction.findOne({ _id: id, userId });
    if (!construction) {
      return res.status(404).json({ message: '施工项目不存在' });
    }

    if (construction.status !== 'acceptance') {
      return res.status(400).json({ message: '当前状态无法确认验收' });
    }

    construction.acceptance = {
      items: items || [],
      passed,
      acceptedAt: new Date(),
      remark
    };

    if (passed) {
      construction.status = 'completed';
      construction.actualEndDate = new Date();
      construction.timeline.push({
        title: '竣工验收通过',
        description: '业主已确认验收通过，施工项目完成',
        status: 'completed',
        date: new Date()
      });
    } else {
      construction.timeline.push({
        title: '验收未通过',
        description: `验收未通过：${remark || '需要整改'}`,
        status: 'current',
        date: new Date()
      });
    }

    await construction.save();
    res.json({ message: '验收确认成功', construction });
  } catch (error) {
    res.status(500).json({ message: '确认验收失败', error: error.message });
  }
};

module.exports = {
  createConstruction,
  getConstructionList,
  getConstructionDetail,
  placeBid,
  selectConstructor,
  signContract,
  updateProgress,
  uploadPhoto,
  submitReport,
  submitAcceptance,
  confirmAcceptance,
  STANDARD_PROGRESS_NODES
};
