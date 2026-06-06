import { Link } from 'react-router-dom';
import { Home, ChevronRight, ClipboardList, CheckCircle, Clock, Users } from 'lucide-react';
import { useConstructions } from '@/hooks/useApi';

const statusMap: Record<string, string> = {
  bidding: '招标中',
  contract: '签约中',
  constructing: '施工中',
  acceptance: '验收中',
  completed: '已竣工',
  cancelled: '已取消',
};

const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const calculateProgress = (progressNodes: any[]) => {
  if (!progressNodes || progressNodes.length === 0) return 0;
  const completed = progressNodes.filter((node: any) => node.status === 'completed').length;
  return Math.round((completed / progressNodes.length) * 100);
};

const getCurrentPhase = (project: any) => {
  if (project.progressNodes && project.progressNodes.length > 0) {
    const currentNode = project.progressNodes.find((node: any) => node.status === 'in_progress');
    if (currentNode) return currentNode.name;
  }
  return statusMap[project.status] || '';
};

const ConstructionPage = () => {
  const { data, loading } = useConstructions();
  const projects: any[] = data?.constructions || [];

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
          {loading ? (
            Array(3).fill(0).map((_, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm p-6 animate-pulse">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-walnut-100" />
                  <div className="space-y-2">
                    <div className="h-8 w-12 bg-walnut-100 rounded" />
                    <div className="h-4 w-20 bg-walnut-100 rounded" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <>
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
            </>
          )}
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
          {loading ? (
            Array(3).fill(0).map((_, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm p-6 animate-pulse">
                <div className="flex items-start justify-between mb-4">
                  <div className="space-y-2">
                    <div className="h-6 w-48 bg-walnut-100 rounded" />
                    <div className="h-4 w-64 bg-walnut-100 rounded" />
                  </div>
                  <div className="h-7 w-20 bg-walnut-100 rounded-full" />
                </div>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="h-4 w-32 bg-walnut-100 rounded" />
                    <div className="h-4 w-12 bg-walnut-100 rounded" />
                  </div>
                  <div className="h-2 bg-walnut-100 rounded-full" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-4 w-28 bg-walnut-100 rounded" />
                    <div className="h-4 w-28 bg-walnut-100 rounded" />
                  </div>
                  <div className="h-4 w-16 bg-walnut-100 rounded" />
                </div>
              </div>
            ))
          ) : (
            projects.map((project) => {
              const progress = calculateProgress(project.progressNodes);
              const currentPhase = getCurrentPhase(project);
              const statusText = statusMap[project.status] || '';
              const startDate = formatDate(project.createdAt);
              const expectedDate = formatDate(project.expectedEndDate);

              return (
                <Link
                  key={project._id}
                  to={`/construction/${project._id}/progress`}
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
                        : project.status === 'constructing'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gold-100 text-gold-700'
                    }`}>
                      {statusText}
                    </span>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-walnut-600">当前阶段：{currentPhase}</span>
                      <span className="text-sm font-medium text-walnut-900">{progress}%</span>
                    </div>
                    <div className="h-2 bg-walnut-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          project.status === 'completed'
                            ? 'bg-green-500'
                            : 'bg-gold-500'
                        }`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-walnut-500">
                    <div className="flex items-center gap-4">
                      <span>开工：{startDate}</span>
                      <span>预计完工：{expectedDate}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gold-600 font-medium">
                      查看进度
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default ConstructionPage;
