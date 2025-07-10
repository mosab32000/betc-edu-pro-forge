
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Building, 
  School, 
  Users, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Award,
  TrendingUp,
  Calendar,
  Search,
  Filter,
  ChevronDown,
  ChevronRight,
  TreePine
} from 'lucide-react';
import { MinistryEntity, EntityType } from '@/types/ministry';
import { ministryHierarchy } from '@/data/ministryData';
import { cn } from '@/lib/utils';

const MinistryHierarchy: React.FC = () => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['moe-jordan']));
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEntity, setSelectedEntity] = useState<MinistryEntity | null>(null);
  const [filterType, setFilterType] = useState<EntityType | 'all'>('all');

  const entityIcons = {
    ministry: Building,
    directorate: Building,
    school: School,
    department: Building,
    unit: Building,
    center: Building,
    institute: School,
    university: School,
    college: School
  };

  const entityColors = {
    ministry: 'bg-purple-100 text-purple-700 border-purple-200',
    directorate: 'bg-blue-100 text-blue-700 border-blue-200',
    school: 'bg-green-100 text-green-700 border-green-200',
    department: 'bg-orange-100 text-orange-700 border-orange-200',
    unit: 'bg-gray-100 text-gray-700 border-gray-200',
    center: 'bg-pink-100 text-pink-700 border-pink-200',
    institute: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    university: 'bg-red-100 text-red-700 border-red-200',
    college: 'bg-yellow-100 text-yellow-700 border-yellow-200'
  };

  const filteredEntities = useMemo(() => {
    let filtered = ministryHierarchy;
    
    if (filterType !== 'all') {
      filtered = filtered.filter(entity => entity.type === filterType);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(entity => 
        entity.nameAr.includes(searchTerm) || 
        entity.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entity.description.includes(searchTerm)
      );
    }
    
    return filtered;
  }, [searchTerm, filterType]);

  const buildHierarchy = (entities: MinistryEntity[], parentId?: string) => {
    return entities
      .filter(entity => entity.parentId === parentId)
      .map(entity => ({
        ...entity,
        children: buildHierarchy(entities, entity.id)
      }));
  };

  const hierarchicalData = buildHierarchy(filteredEntities);

  const toggleNode = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const renderEntity = (entity: MinistryEntity & { children?: MinistryEntity[] }, level = 0) => {
    const Icon = entityIcons[entity.type];
    const hasChildren = entity.children && entity.children.length > 0;
    const isExpanded = expandedNodes.has(entity.id);

    return (
      <div key={entity.id} className="mb-2">
        <Card 
          className={cn(
            "cursor-pointer transition-all hover:shadow-md",
            selectedEntity?.id === entity.id && "ring-2 ring-blue-500",
            `ml-${level * 6}`
          )}
          onClick={() => setSelectedEntity(entity)}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {hasChildren && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-1 h-6 w-6"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleNode(entity.id);
                    }}
                  >
                    {isExpanded ? 
                      <ChevronDown className="w-4 h-4" /> : 
                      <ChevronRight className="w-4 h-4" />
                    }
                  </Button>
                )}
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Icon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{entity.nameAr}</h3>
                  <p className="text-xs text-gray-500">{entity.nameEn}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={cn("text-xs", entityColors[entity.type])}>
                  {entity.type}
                </Badge>
                <Badge 
                  variant={entity.status === 'active' ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {entity.status}
                </Badge>
              </div>
            </div>

            {/* معلومات سريعة */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3 pt-3 border-t">
              {entity.metadata.studentsCount && (
                <div className="text-center">
                  <p className="text-xs text-gray-500">الطلاب</p>
                  <p className="font-semibold text-sm">{entity.metadata.studentsCount.toLocaleString()}</p>
                </div>
              )}
              {entity.metadata.teachersCount && (
                <div className="text-center">
                  <p className="text-xs text-gray-500">المعلمون</p>
                  <p className="font-semibold text-sm">{entity.metadata.teachersCount.toLocaleString()}</p>
                </div>
              )}
              {entity.metadata.staffCount && (
                <div className="text-center">
                  <p className="text-xs text-gray-500">الموظفون</p>
                  <p className="font-semibold text-sm">{entity.metadata.staffCount.toLocaleString()}</p>
                </div>
              )}
              <div className="text-center">
                <p className="text-xs text-gray-500">المستوى</p>
                <p className="font-semibold text-sm">{entity.level}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* عرض الكيانات الفرعية */}
        {hasChildren && isExpanded && (
          <div className="mt-2 space-y-2">
            {entity.children!.map(child => renderEntity(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6 p-6">
      {/* رأس الصفحة */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-100 rounded-lg">
            <TreePine className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">الهيكل التنظيمي</h1>
            <p className="text-gray-600">وزارة التربية والتعليم الأردنية</p>
          </div>
        </div>
      </div>

      {/* شريط البحث والفلاتر */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="البحث في الكيانات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as EntityType | 'all')}
          className="px-4 py-2 border rounded-lg bg-white"
        >
          <option value="all">جميع الأنواع</option>
          <option value="ministry">وزارة</option>
          <option value="directorate">مديرية</option>
          <option value="school">مدرسة</option>
          <option value="department">قسم</option>
          <option value="center">مركز</option>
          <option value="university">جامعة</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* الهيكل التنظيمي */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="petra-card">
            <CardHeader>
              <CardTitle>الهيكل التنظيمي</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {hierarchicalData.map(entity => renderEntity(entity))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* تفاصيل الكيان المحدد */}
        <div className="space-y-4">
          {selectedEntity ? (
            <Card className="petra-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {React.createElement(entityIcons[selectedEntity.type], { 
                    className: "w-5 h-5 text-blue-600" 
                  })}
                  تفاصيل الكيان
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-bold text-lg">{selectedEntity.nameAr}</h3>
                  <p className="text-gray-600">{selectedEntity.nameEn}</p>
                  <p className="text-sm text-gray-500 mt-2">{selectedEntity.description}</p>
                </div>

                {/* معلومات الاتصال */}
                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    الموقع
                  </h4>
                  <p className="text-sm text-gray-600">
                    {selectedEntity.location.governorate}, {selectedEntity.location.city}
                  </p>
                  <p className="text-sm text-gray-600">{selectedEntity.location.address}</p>
                </div>

                {selectedEntity.contact.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{selectedEntity.contact.phone}</span>
                  </div>
                )}

                {selectedEntity.contact.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{selectedEntity.contact.email}</span>
                  </div>
                )}

                {selectedEntity.contact.website && (
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{selectedEntity.contact.website}</span>
                  </div>
                )}

                {/* الإحصائيات */}
                <div className="grid grid-cols-2 gap-4">
                  {selectedEntity.metadata.studentsCount && (
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <p className="text-xs text-gray-500">الطلاب</p>
                      <p className="font-bold">{selectedEntity.metadata.studentsCount.toLocaleString()}</p>
                    </div>
                  )}
                  {selectedEntity.metadata.teachersCount && (
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <p className="text-xs text-gray-500">المعلمون</p>
                      <p className="font-bold">{selectedEntity.metadata.teachersCount.toLocaleString()}</p>
                    </div>
                  )}
                  {selectedEntity.metadata.staffCount && (
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <p className="text-xs text-gray-500">الموظفون</p>
                      <p className="font-bold">{selectedEntity.metadata.staffCount.toLocaleString()}</p>
                    </div>
                  )}
                  {selectedEntity.metadata.budget && (
                    <div className="text-center p-3 bg-yellow-50 rounded-lg">
                      <p className="text-xs text-gray-500">الميزانية</p>
                      <p className="font-bold">{selectedEntity.metadata.budget.toLocaleString()} د.أ</p>
                    </div>
                  )}
                </div>

                {/* البرامج والتخصصات */}
                {selectedEntity.metadata.programs && selectedEntity.metadata.programs.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">البرامج</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedEntity.metadata.programs.map((program, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {program}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* الإنجازات */}
                {selectedEntity.metadata.achievements && selectedEntity.metadata.achievements.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      الإنجازات
                    </h4>
                    <div className="space-y-2">
                      {selectedEntity.metadata.achievements.map((achievement) => (
                        <div key={achievement.id} className="p-3 bg-green-50 rounded-lg">
                          <h5 className="font-medium text-sm">{achievement.title}</h5>
                          <p className="text-xs text-gray-600">{achievement.description}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Calendar className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-500">
                              {achievement.date.toLocaleDateString('ar-SA')}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="petra-card">
              <CardContent className="p-8 text-center">
                <Building className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">اختر كياناً لعرض التفاصيل</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default MinistryHierarchy;
