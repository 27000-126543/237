import { CheckCircle, Clock, AlertCircle, Camera, FileText, User, Calendar } from 'lucide-react';
import { constructionProgress, constructionPhotos, constructionReports } from '../data/mockData';

const ProgressPage = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-gold-500';
      case 'in_progress':
        return 'text-walnut-600';
      default:
        return 'text-walnut-300';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-gradient-to-br from-gold-400 to-gold-600';
      case 'in_progress':
        return 'bg-walnut-600';
      default:
        return 'bg-walnut-200';
    }
  };

  const getReportStatusStyle = (status: string) => {
    switch (status) {
      case 'normal':
        return 'bg-green-50 text-green-700';
      case 'warning':
        return 'bg-amber-50 text-amber-700';
      case 'issue':
        return 'bg-red-50 text-red-700';
      default:
        return 'bg-walnut-50 text-walnut-700';
    }
  };

  const getReportStatusText = (status: string) => {
    switch (status) {
      case 'normal':
        return '正常';
      case 'warning':
        return '提醒';
      case 'issue':
        return '问题';
      default:
        return '未知';
    }
  };

  const completedCount = constructionProgress.filter(p => p.status === 'completed').length;
  const totalPhases = constructionProgress.length;
  const overallProgress = Math.round((completedCount / totalPhases) * 100);

  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <span className="text-gold-600 font-medium">施工管理</span>
          <h1 className="text-4xl font-serif font-bold text-walnut-900 mt-2 mb-4">
            施工进度
          </h1>
          <p className="text-walnut-500 max-w-2xl mx-auto">
            实时跟踪装修进度，透明化施工过程，让您随时了解家的变化
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 mb-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-serif font-bold text-walnut-900">
              翡翠花园三居室装修
            </h2>
            <div className="flex items-center gap-2 px-4 py-2 bg-gold-50 rounded-full">
              <span className="text-gold-700 font-semibold">总进度 {overallProgress}%</span>
            </div>
          </div>
          <div className="w-full h-3 bg-walnut-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-gold-400 to-gold-600 rounded-full transition-all duration-1000"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
          <div className="flex justify-between mt-4 text-sm text-walnut-500">
            <span>开工：2026-04-10</span>
            <span>预计竣工：2026-06-25</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-serif font-bold text-walnut-900 mb-8 flex items-center gap-3">
                <Clock className="w-6 h-6 text-gold-600" />
                施工进度时间轴
              </h2>
              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-walnut-100" />
                <div className="space-y-8">
                  {constructionProgress.map((phase, index) => (
                    <div key={phase.id} className="relative flex gap-6">
                      <div className={`relative z-10 w-12 h-12 rounded-full ${getStatusBg(phase.status)} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                        {phase.status === 'completed' ? (
                          <CheckCircle className="w-6 h-6 text-white" />
                        ) : phase.status === 'in_progress' ? (
                          <div className="w-4 h-4 bg-white rounded-full animate-pulse" />
                        ) : (
                          <div className="w-4 h-4 bg-white rounded-full" />
                        )}
                      </div>
                      <div className="flex-1 pt-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className={`text-lg font-bold ${phase.status === 'completed' ? 'text-gold-700' : phase.status === 'in_progress' ? 'text-walnut-900' : 'text-walnut-400'}`}>
                            {phase.name}
                          </h3>
                          {phase.startDate && (
                            <span className="text-sm text-walnut-500 flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {phase.startDate}
                              {phase.endDate && ` - ${phase.endDate}`}
                            </span>
                          )}
                        </div>
                        <p className={`${phase.status === 'pending' ? 'text-walnut-400' : 'text-walnut-600'}`}>
                          {phase.description}
                        </p>
                        {phase.status === 'in_progress' && (
                          <div className="mt-3">
                            <div className="w-full h-2 bg-walnut-100 rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-walnut-500 to-walnut-600 rounded-full" style={{ width: '60%' }} />
                            </div>
                            <span className="text-xs text-walnut-500 mt-1 block">进行中 60%</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-serif font-bold text-walnut-900 mb-6 flex items-center gap-3">
                <Camera className="w-6 h-6 text-gold-600" />
                现场照片墙
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {constructionPhotos.map((photo, index) => (
                  <div key={photo.id} className="group relative rounded-xl overflow-hidden cursor-pointer">
                    <img
                      src={photo.url}
                      alt={photo.description}
                      className={`w-full object-cover group-hover:scale-110 transition-transform duration-500 ${index % 3 === 0 ? 'h-48' : 'h-36'}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-walnut-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                      <p className="text-white text-sm font-medium truncate">{photo.description}</p>
                      <p className="text-white/70 text-xs mt-1">{photo.uploadedAt}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-serif font-bold text-walnut-900 mb-6 flex items-center gap-3">
                <FileText className="w-6 h-6 text-gold-600" />
                监理报告
              </h2>
              <div className="space-y-4">
                {constructionReports.map((report) => (
                  <div key={report.id} className="p-4 bg-cream rounded-xl hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-walnut-900 text-sm">{report.title}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getReportStatusStyle(report.status)}`}>
                        {getReportStatusText(report.status)}
                      </span>
                    </div>
                    <p className="text-walnut-600 text-sm line-clamp-2 mb-3">{report.content}</p>
                    <div className="flex items-center justify-between text-xs text-walnut-500">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>{report.submittedBy}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{report.submittedAt}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-gold-50 to-walnut-50 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-gold-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-walnut-900">今日提醒</h3>
                  <p className="text-walnut-500 text-sm">木工施工中</p>
                </div>
              </div>
              <p className="text-walnut-600 text-sm">
                客厅吊顶龙骨已完成，主卧衣柜框架正在制作中。预计5月28日完成木工阶段。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;
