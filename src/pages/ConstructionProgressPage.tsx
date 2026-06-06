import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Home,
  ChevronRight,
  Image,
  FileText,
  MessageSquare,
  Calendar,
  CheckCircle,
  Clock,
  User,
} from 'lucide-react';

const ConstructionProgressPage = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('progress');

  const project = {
    id: id,
    name: '张先生家装修项目',
    address: '北京市朝阳区XX小区',
    area: 120,
    startDate: '2024-01-15',
    expectedDate: '2024-04-15',
    manager: {
      name: '王工长',
      phone: '138****8888',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=worker%20avatar&image_size=square',
    },
    progress: 65,
  };

  const progressLogs = [
    {
      id: 1,
      phase: '水电改造',
      date: '2024-02-20',
      status: 'current',
      description: '水电管线铺设完成，等待验收',
      images: [
        'https://picsum.photos/seed/construction1/300/200',
        'https://picsum.photos/seed/construction2/300/200',
      ],
    },
    {
      id: 2,
      phase: '拆改工程',
      date: '2024-02-10',
      status: 'completed',
      description: '墙体拆除及新建完成，已验收',
      images: [
        'https://picsum.photos/seed/construction3/300/200',
      ],
    },
    {
      id: 3,
      phase: '设计交底',
      date: '2024-01-20',
      status: 'completed',
      description: '设计师、工长、业主三方交底完成',
      images: [],
    },
  ];

  const tabs = [
    { key: 'progress', label: '施工进度', icon: Clock },
    { key: 'photos', label: '现场照片', icon: Image },
    { key: 'documents', label: '工程文档', icon: FileText },
    { key: 'communication', label: '沟通记录', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-cream py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-2 mb-6">
          <Link to="/" className="text-walnut-500 hover:text-gold-600 transition-colors">
            <Home className="w-5 h-5" />
          </Link>
          <ChevronRight className="w-4 h-4 text-walnut-400" />
          <Link to="/construction" className="text-walnut-500 hover:text-gold-600 transition-colors">
            施工管理
          </Link>
          <ChevronRight className="w-4 h-4 text-walnut-400" />
          <h1 className="text-2xl font-serif font-bold text-walnut-900">施工进度</h1>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-walnut-900 mb-2">{project.name}</h2>
              <p className="text-walnut-500 flex items-center gap-1 mb-2">
                <Home className="w-4 h-4" />
                {project.address} · {project.area}㎡
              </p>
              <p className="text-walnut-500 text-sm flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {project.startDate} - {project.expectedDate}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-gold-600">{project.progress}%</p>
                <p className="text-sm text-walnut-500">总进度</p>
              </div>
              <div className="h-16 w-px bg-walnut-100" />
              <div className="flex items-center gap-3">
                <img
                  src={project.manager.avatar}
                  alt={project.manager.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-walnut-900">{project.manager.name}</p>
                  <p className="text-sm text-walnut-500">项目工长</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="border-b border-walnut-100">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                      activeTab === tab.key
                        ? 'border-gold-500 text-gold-600'
                        : 'border-transparent text-walnut-500 hover:text-walnut-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'progress' && (
              <div className="space-y-6">
                {progressLogs.map((log, index) => (
                  <div key={log.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        log.status === 'completed'
                          ? 'bg-green-500 text-white'
                          : log.status === 'current'
                          ? 'bg-gold-500 text-walnut-900'
                          : 'bg-walnut-200 text-walnut-500'
                      }`}>
                        {log.status === 'completed' ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <Clock className="w-5 h-5" />
                        )}
                      </div>
                      {index < progressLogs.length - 1 && (
                        <div className="w-0.5 flex-1 bg-walnut-100 my-2" />
                      )}
                    </div>
                    <div className="flex-1 pb-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-walnut-900">{log.phase}</h3>
                        <span className="text-sm text-walnut-500">{log.date}</span>
                      </div>
                      <p className="text-walnut-600 mb-4">{log.description}</p>
                      {log.images.length > 0 && (
                        <div className="flex gap-3 flex-wrap">
                          {log.images.map((img, i) => (
                            <img
                              key={i}
                              src={img}
                              alt={`现场照片 ${i + 1}`}
                              className="w-32 h-24 object-cover rounded-lg"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'photos' && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.from({ length: 12 }).map((_, i) => (
                  <img
                    key={i}
                    src={`https://picsum.photos/seed/site${i}/300/300`}
                    alt={`现场照片 ${i + 1}`}
                    className="w-full aspect-square object-cover rounded-xl"
                  />
                ))}
              </div>
            )}

            {activeTab === 'documents' && (
              <div className="space-y-3">
                {[
                  { name: '施工合同.pdf', size: '2.5MB', date: '2024-01-10' },
                  { name: '施工图纸.zip', size: '15.8MB', date: '2024-01-12' },
                  { name: '材料清单.xlsx', size: '1.2MB', date: '2024-01-15' },
                  { name: '验收报告.docx', size: '856KB', date: '2024-02-10' },
                ].map((doc, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 bg-walnut-50 rounded-xl hover:bg-walnut-100 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gold-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-gold-600" />
                      </div>
                      <div>
                        <p className="font-medium text-walnut-900">{doc.name}</p>
                        <p className="text-sm text-walnut-500">{doc.size} · {doc.date}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-walnut-400" />
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'communication' && (
              <div className="space-y-4">
                {[
                  { user: '王工长', message: '今天水电改造已经完成了，麻烦您明天有空过来验收一下。', time: '10:30', isMe: false },
                  { user: '我', message: '好的，明天下午我过去。', time: '10:35', isMe: true },
                  { user: '李设计师', message: '我把更新后的图纸发到您邮箱了，您看一下有没有问题。', time: '昨天 15:20', isMe: false },
                ].map((msg, i) => (
                  <div key={i} className={`flex gap-3 ${msg.isMe ? 'flex-row-reverse' : ''}`}>
                    <div className="w-10 h-10 rounded-full bg-walnut-200 flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-walnut-500" />
                    </div>
                    <div className={`max-w-[70%] ${msg.isMe ? 'text-right' : ''}`}>
                      <p className="text-sm text-walnut-500 mb-1">{msg.user} · {msg.time}</p>
                      <div className={`inline-block px-4 py-3 rounded-2xl ${
                        msg.isMe
                          ? 'bg-gold-500 text-walnut-900'
                          : 'bg-walnut-100 text-walnut-700'
                      }`}>
                        {msg.message}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConstructionProgressPage;
