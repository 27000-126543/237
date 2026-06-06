import { Link } from 'react-router-dom';
import { Home, ChevronRight, ClipboardList, CheckCircle, Clock, Users } from 'lucide-react';

const ConstructionPage = () => {
  const projects = [
    {
      id: 1,
      name: '张先生家装修项目',
      address: '北京市朝阳区XX小区',
      status: 'construction',
      statusText: '施工中',
      progress: 65,
      currentPhase: '水电改造',
      startDate: '2024-01-15',
      expectedDate: '2024-04-15',
    },
    {
      id: 2,
      name: '李女士别墅装修',
      address: '北京市海淀区XX别墅',
      status: 'planning',
      statusText: '准备中',
      progress: 10,
      currentPhase: '设计确认',
      startDate: '2024-02-01',
      expectedDate: '2024-06-01',
    },
    {
      id: 3,
      name: '王先生旧房改造',
      address: '北京市西城区XX胡同',
      status: 'completed',
      statusText: '已竣工',
      progress: 100,
      currentPhase: '验收完成',
      startDate: '2023-10-01',
      expectedDate: '2024-01-01',
    },
  ];

  const phases = [
    { name: '设计阶段', icon: ClipboardList, status: 'done' },
    { name: '拆改阶段', icon: Home, status: 'done' },
    { name: '水电阶段', icon: ClipboardList, status: 'current' },
    { name: '泥木阶段', icon: Home, status: 'pending' },
    { name: '油漆阶段', icon: ClipboardList, status: 'pending' },
    { name: '安装阶段', icon: Home, status: 'pending' },
    { name: '竣工验收', icon: CheckCircle, status: 'pending' },
  ];

  return (
    <div className="min-h-screen bg-cream py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-2 mb-6">
          <Link to="/" className="text-walnut-500 hover:text-gold-600 transition-colors">
            <Home className="w-5 h-5" />
          </Link>
          <ChevronRight className="w-4 h-4 text-walnut-400" />
          <h1 className="text-2xl font-serif font-bold text-walnut-900">施工管理</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <ClipboardList className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-walnut-900">{projects.length}</p>
                <p className="text-walnut-500">全部项目</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gold-100 flex items-center justify-center">
                <Clock className="w-6 h-6 text-gold-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-walnut-900">
                  {projects.filter(p => p.status !== 'completed').length}
                </p>
                <p className="text-walnut-500">进行中</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-walnut-900">
                  {projects.filter(p => p.status === 'completed').length}
                </p>
                <p className="text-walnut-500">已完成</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-8">
          <div className="p-6 border-b border-walnut-100">
            <h2 className="text-lg font-semibold text-walnut-900">施工阶段说明</h2>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between overflow-x-auto pb-2">
              {phases.map((phase, index) => {
                const Icon = phase.icon;
                return (
                  <div key={index} className="flex flex-col items-center min-w-[100px]">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                      phase.status === 'done'
                        ? 'bg-green-500 text-white'
                        : phase.status === 'current'
                        ? 'bg-gold-500 text-walnut-900 animate-pulse'
                        : 'bg-walnut-100 text-walnut-400'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-sm font-medium ${
                      phase.status === 'done'
                        ? 'text-green-600'
                        : phase.status === 'current'
                        ? 'text-gold-600'
                        : 'text-walnut-400'
                    }`}>
                      {phase.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {projects.map((project) => (
            <Link
              key={project.id}
              to={`/construction/${project.id}/progress`}
              className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow block"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-walnut-900 mb-1">{project.name}</h3>
                  <p className="text-walnut-500 text-sm flex items-center gap-1">
                    <Home className="w-4 h-4" />
                    {project.address}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  project.status === 'completed'
                    ? 'bg-green-100 text-green-700'
                    : project.status === 'construction'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gold-100 text-gold-700'
                }`}>
                  {project.statusText}
                </span>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-walnut-600">当前阶段：{project.currentPhase}</span>
                  <span className="text-sm font-medium text-walnut-900">{project.progress}%</span>
                </div>
                <div className="h-2 bg-walnut-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      project.status === 'completed'
                        ? 'bg-green-500'
                        : 'bg-gold-500'
                    }`}
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-walnut-500">
                <div className="flex items-center gap-4">
                  <span>开工：{project.startDate}</span>
                  <span>预计完工：{project.expectedDate}</span>
                </div>
                <div className="flex items-center gap-1 text-gold-600 font-medium">
                  查看进度
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConstructionPage;
