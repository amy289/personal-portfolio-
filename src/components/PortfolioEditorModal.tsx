import { useState } from 'react';
import { 
  X, 
  Save, 
  RotateCcw, 
  Download, 
  Upload, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  Inbox, 
  GraduationCap, 
  User, 
  Sparkles,
  Code,
  FolderGit2
} from 'lucide-react';
import { PortfolioData, ProjectItem, SkillItem, ContactSubmission, CertificationItem } from '../types';

interface PortfolioEditorModalProps {
  portfolio: PortfolioData;
  isOpen: boolean;
  onClose: () => void;
  onSave: (newData: PortfolioData) => void;
  onReset: () => void;
  messages: ContactSubmission[];
  onClearMessages: () => void;
}

export default function PortfolioEditorModal({
  portfolio,
  isOpen,
  onClose,
  onSave,
  onReset,
  messages,
  onClearMessages
}: PortfolioEditorModalProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'education' | 'projects' | 'skills' | 'messages' | 'export'>('profile');
  const [formData, setFormData] = useState<PortfolioData>(portfolio);
  const [savedToast, setSavedToast] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isAddingProject, setIsAddingProject] = useState(false);

  // New skill input
  const [newSkill, setNewSkill] = useState<{
    name: string;
    category: 'Web Development' | 'Programming Languages' | 'AI & Emerging Tech' | 'Security & Tools';
    level: number;
    statusTag: string;
  }>({
    name: '',
    category: 'Web Development',
    level: 80,
    statusTag: 'Hands-on'
  });

  if (!isOpen) return null;

  const handleSaveAll = () => {
    onSave(formData);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2000);
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(formData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `amyy-portfolio.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.name && parsed.education) {
          setFormData(parsed);
          onSave(parsed);
          setSavedToast(true);
          setTimeout(() => setSavedToast(false), 2000);
        }
      } catch (err) {
        alert('Invalid JSON file format.');
      }
    };
    reader.readAsText(file);
  };

  const handleAddSkill = () => {
    if (!newSkill.name.trim()) return;
    const updatedSkills: SkillItem[] = [
      ...formData.skills,
      {
        name: newSkill.name.trim(),
        category: newSkill.category,
        level: Number(newSkill.level),
        statusTag: newSkill.statusTag,
        isCore: true
      }
    ];
    setFormData({ ...formData, skills: updatedSkills });
    setNewSkill({ name: '', category: 'Web Development', level: 80, statusTag: 'Hands-on' });
  };

  const handleDeleteSkill = (name: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(s => s.name !== name)
    });
  };

  const handleDeleteProject = (id: string) => {
    setFormData({
      ...formData,
      projects: formData.projects.filter(p => p.id !== id)
    });
  };

  const handleSaveProject = (project: ProjectItem) => {
    const exists = formData.projects.some(p => p.id === project.id);
    let updatedProjects: ProjectItem[];
    if (exists) {
      updatedProjects = formData.projects.map(p => p.id === project.id ? project : p);
    } else {
      updatedProjects = [project, ...formData.projects];
    }
    setFormData({ ...formData, projects: updatedProjects });
    setEditingProject(null);
    setIsAddingProject(false);
  };

  return (
    <div
      id="portfolio-editor-modal-backdrop"
      className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in"
      onClick={onClose}
    >
      <div
        id="portfolio-editor-container"
        className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 max-w-4xl w-full max-h-[92vh] overflow-hidden shadow-2xl flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-50 dark:bg-stone-950 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-stone-900 dark:bg-stone-100 text-stone-50 dark:text-stone-900">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base sm:text-lg text-stone-900 dark:text-stone-100">
                Live Portfolio Customizer — Amyy
              </h3>
              <p className="text-xs text-stone-500">
                Update your contact details, career objective, academic status, projects, and skills.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="editor-save-all-btn"
              type="button"
              onClick={handleSaveAll}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white transition-all shadow-xs"
            >
              {savedToast ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Save className="w-3.5 h-3.5" />}
              <span>{savedToast ? 'Saved!' : 'Save Changes'}</span>
            </button>

            <button
              id="editor-close-btn"
              type="button"
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-800 dark:hover:text-stone-100 rounded-lg"
              aria-label="Close portfolio editor"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 px-6 pt-3 border-b border-stone-200 dark:border-stone-800 bg-stone-100/50 dark:bg-stone-900/50 overflow-x-auto shrink-0">
          {[
            { id: 'profile', label: 'Basic Profile & Bio', icon: User },
            { id: 'education', label: 'Education & Certs', icon: GraduationCap },
            { id: 'projects', label: `Projects (${formData.projects.length})`, icon: FolderGit2 },
            { id: 'skills', label: `Skills (${formData.skills.length})`, icon: Code },
            { id: 'messages', label: `Inbox (${messages.length})`, icon: Inbox },
            { id: 'export', label: 'Export / Reset', icon: Download },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                id={`editor-tab-${tab.id}`}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-stone-900 dark:border-stone-100 text-stone-900 dark:text-stone-100 bg-white dark:bg-stone-900 rounded-t-lg'
                    : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="p-6 overflow-y-auto grow space-y-6">
          
          {/* TAB: PROFILE */}
          {activeTab === 'profile' && (
            <div className="space-y-4 max-w-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Headline Role
                  </label>
                  <input
                    type="text"
                    value={formData.headlineRole}
                    onChange={(e) => setFormData({ ...formData, headlineRole: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Institution / University
                  </label>
                  <input
                    type="text"
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    LinkedIn Profile URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://www.linkedin.com/in/yourprofile"
                    value={formData.socials?.linkedin || ''}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      socials: { ...formData.socials, linkedin: e.target.value } 
                    })}
                    className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Fiverr Profile URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://www.fiverr.com/yourusername"
                    value={formData.socials?.fiverr || ''}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      socials: { ...formData.socials, fiverr: e.target.value } 
                    })}
                    className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Availability Status Tag
                </label>
                <input
                  type="text"
                  value={formData.statusBadge}
                  onChange={(e) => setFormData({ ...formData, statusBadge: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Profile Summary
                </label>
                <textarea
                  rows={3}
                  value={formData.profile}
                  onChange={(e) => setFormData({ ...formData, profile: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 resize-y"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Career Objective
                </label>
                <textarea
                  rows={3}
                  value={formData.careerObjective}
                  onChange={(e) => setFormData({ ...formData, careerObjective: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 resize-y"
                />
              </div>
            </div>
          )}

          {/* TAB: EDUCATION */}
          {activeTab === 'education' && (
            <div className="space-y-6 max-w-2xl">
              <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 space-y-3">
                <h4 className="font-display font-bold text-xs uppercase tracking-wider text-stone-500">
                  Degree Details
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 dark:text-stone-400 mb-1">
                      Degree Title
                    </label>
                    <input
                      type="text"
                      value={formData.education.degree}
                      onChange={(e) => setFormData({
                        ...formData,
                        education: { ...formData.education, degree: e.target.value }
                      })}
                      className="w-full px-3 py-1.5 text-xs bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 dark:text-stone-400 mb-1">
                      University
                    </label>
                    <input
                      type="text"
                      value={formData.education.institution}
                      onChange={(e) => setFormData({
                        ...formData,
                        education: { ...formData.education, institution: e.target.value }
                      })}
                      className="w-full px-3 py-1.5 text-xs bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 dark:text-stone-400 mb-1">
                      Semester
                    </label>
                    <input
                      type="text"
                      value={formData.education.semester}
                      onChange={(e) => setFormData({
                        ...formData,
                        education: { ...formData.education, semester: e.target.value }
                      })}
                      className="w-full px-3 py-1.5 text-xs bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 dark:text-stone-400 mb-1">
                      Year Standing
                    </label>
                    <input
                      type="text"
                      value={formData.education.yearLevel}
                      onChange={(e) => setFormData({
                        ...formData,
                        education: { ...formData.education, yearLevel: e.target.value }
                      })}
                      className="w-full px-3 py-1.5 text-xs bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 dark:text-stone-400 mb-1">
                      CGPA
                    </label>
                    <input
                      type="text"
                      value={formData.education.cgpa}
                      onChange={(e) => setFormData({
                        ...formData,
                        education: { ...formData.education, cgpa: e.target.value }
                      })}
                      className="w-full px-3 py-1.5 text-xs bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 dark:text-stone-400 mb-1">
                      Graduation Year
                    </label>
                    <input
                      type="text"
                      value={formData.education.graduationYear}
                      onChange={(e) => setFormData({
                        ...formData,
                        education: { ...formData.education, graduationYear: e.target.value }
                      })}
                      className="w-full px-3 py-1.5 text-xs bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Certifications list */}
              <div className="space-y-3">
                <h4 className="font-display font-bold text-xs uppercase tracking-wider text-stone-500">
                  Certifications ({formData.certifications.length})
                </h4>

                {formData.certifications.map((cert) => (
                  <div key={cert.id} className="p-3.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-xs text-stone-900 dark:text-stone-100">
                        {cert.title}
                      </div>
                      <div className="text-[11px] text-stone-500">
                        {cert.issuer} • <span className={cert.status === 'Completed' ? 'text-emerald-600 font-semibold' : 'text-amber-600 font-semibold'}>{cert.status}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: PROJECTS */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              {/* Project Editor Form Modal */}
              {(isAddingProject || editingProject) ? (
                <div className="p-5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 space-y-4">
                  <h4 className="font-display font-bold text-sm text-stone-900 dark:text-stone-100">
                    {isAddingProject ? 'Add Student Project' : 'Edit Project'}
                  </h4>
                  
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const target = e.target as any;
                    const projectToSave: ProjectItem = {
                      id: editingProject?.id || `project-${Date.now()}`,
                      title: target.projectTitle.value,
                      tagline: target.projectTagline.value,
                      description: target.projectDesc.value,
                      category: target.projectCategory.value,
                      year: target.projectYear.value,
                      statusNote: target.projectStatus.value,
                      tags: target.projectTags.value.split(',').map((t: string) => t.trim()).filter(Boolean),
                      featured: true
                    };
                    handleSaveProject(projectToSave);
                  }} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-600 dark:text-stone-400 mb-1">
                          Project Title *
                        </label>
                        <input
                          name="projectTitle"
                          required
                          defaultValue={editingProject?.title || ''}
                          className="w-full px-3 py-1.5 text-xs bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-600 dark:text-stone-400 mb-1">
                          Category
                        </label>
                        <input
                          name="projectCategory"
                          defaultValue={editingProject?.category || 'Web Development'}
                          className="w-full px-3 py-1.5 text-xs bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-600 dark:text-stone-400 mb-1">
                        One-Line Tagline
                      </label>
                      <input
                        name="projectTagline"
                        required
                        defaultValue={editingProject?.tagline || ''}
                        className="w-full px-3 py-1.5 text-xs bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-600 dark:text-stone-400 mb-1">
                        Description
                      </label>
                      <textarea
                        name="projectDesc"
                        required
                        rows={3}
                        defaultValue={editingProject?.description || ''}
                        className="w-full px-3 py-1.5 text-xs bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-600 dark:text-stone-400 mb-1">
                          Tags (comma-separated)
                        </label>
                        <input
                          name="projectTags"
                          defaultValue={editingProject?.tags.join(', ') || 'HTML5, CSS3, JavaScript'}
                          className="w-full px-3 py-1.5 text-xs bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-600 dark:text-stone-400 mb-1">
                          Year
                        </label>
                        <input
                          name="projectYear"
                          defaultValue={editingProject?.year || '2024'}
                          className="w-full px-3 py-1.5 text-xs bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-600 dark:text-stone-400 mb-1">
                          Status Note
                        </label>
                        <input
                          name="projectStatus"
                          defaultValue={editingProject?.statusNote || 'Student Project • Not publicly launched'}
                          className="w-full px-3 py-1.5 text-xs bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => { setEditingProject(null); setIsAddingProject(false); }}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-800"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-stone-900 dark:bg-stone-100 dark:text-stone-900"
                      >
                        Save Project
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                    Active Student Projects
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsAddingProject(true)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:opacity-90"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Project</span>
                  </button>
                </div>
              )}

              {/* Projects List */}
              <div className="space-y-3">
                {formData.projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 flex items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-stone-900 dark:text-stone-100">
                          {proj.title}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400">
                          {proj.category}
                        </span>
                        <span className="text-xs text-amber-700 dark:text-amber-400">{proj.statusNote}</span>
                      </div>
                      <p className="text-xs text-stone-500 mt-1 line-clamp-1">{proj.tagline}</p>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => { setEditingProject(proj); setIsAddingProject(false); }}
                        className="p-1.5 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 rounded"
                        title="Edit Project"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteProject(proj.id)}
                        className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded"
                        title="Delete Project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: SKILLS */}
          {activeTab === 'skills' && (
            <div className="space-y-6">
              {/* Add Skill Row */}
              <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 flex flex-wrap items-end gap-3">
                <div className="flex-1 min-w-[150px]">
                  <label className="block text-[11px] font-semibold text-stone-600 dark:text-stone-400 mb-1">
                    Skill Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Python, SQL"
                    value={newSkill.name}
                    onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-stone-600 dark:text-stone-400 mb-1">
                    Category
                  </label>
                  <select
                    value={newSkill.category}
                    onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value as any })}
                    className="px-3 py-1.5 text-xs bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg"
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="Programming Languages">Programming Languages</option>
                    <option value="AI & Emerging Tech">AI & Emerging Tech</option>
                    <option value="Security & Tools">Security & Tools</option>
                  </select>
                </div>

                <div className="w-20">
                  <label className="block text-[11px] font-semibold text-stone-600 dark:text-stone-400 mb-1">
                    Level %
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={newSkill.level}
                    onChange={(e) => setNewSkill({ ...newSkill, level: Number(e.target.value) })}
                    className="w-full px-3 py-1.5 text-xs bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg"
                  />
                </div>

                <div className="w-28">
                  <label className="block text-[11px] font-semibold text-stone-600 dark:text-stone-400 mb-1">
                    Status Tag
                  </label>
                  <input
                    type="text"
                    placeholder="Basic / Core"
                    value={newSkill.statusTag}
                    onChange={(e) => setNewSkill({ ...newSkill, statusTag: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-stone-900 dark:bg-stone-100 dark:text-stone-900 hover:opacity-90"
                >
                  Add Skill
                </button>
              </div>

              {/* Skills List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {formData.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="p-3 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-semibold text-xs text-stone-900 dark:text-stone-100">
                        {skill.name}
                      </div>
                      <div className="text-[10px] text-stone-400 font-mono">
                        {skill.category} • {skill.level}% {skill.statusTag ? `(${skill.statusTag})` : ''}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteSkill(skill.name)}
                      className="p-1 text-stone-400 hover:text-rose-600 rounded"
                      title="Remove Skill"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: INBOX / MESSAGES */}
          {activeTab === 'messages' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                  Received Contact Submissions ({messages.length})
                </span>
                {messages.length > 0 && (
                  <button
                    type="button"
                    onClick={onClearMessages}
                    className="text-xs text-rose-600 hover:underline"
                  >
                    Clear All Messages
                  </button>
                )}
              </div>

              {messages.length === 0 ? (
                <div className="p-8 text-center rounded-xl border border-dashed border-stone-200 dark:border-stone-800 text-stone-500 text-xs">
                  No contact messages received yet. Any messages submitted via the website contact form will appear here!
                </div>
              ) : (
                <div className="space-y-3">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 space-y-2"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-stone-900 dark:text-stone-100">
                          {msg.name} ({msg.email}) {msg.phone ? `• ${msg.phone}` : ''}
                        </span>
                        <span className="text-[11px] text-stone-400 font-mono">
                          {msg.date}
                        </span>
                      </div>
                      {msg.subject && (
                        <div className="text-xs font-semibold text-stone-600 dark:text-stone-300">
                          Subject: {msg.subject}
                        </div>
                      )}
                      <p className="text-xs text-stone-700 dark:text-stone-300 whitespace-pre-wrap bg-stone-50 dark:bg-stone-950 p-3 rounded-lg border border-stone-100 dark:border-stone-800">
                        {msg.message}
                      </p>
                      <div className="pt-1">
                        <a
                          href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || 'Internship Inquiry')}`}
                          className="text-[11px] font-bold text-stone-900 dark:text-stone-100 hover:underline"
                        >
                          Reply via Email &rarr;
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB: EXPORT & BACKUP */}
          {activeTab === 'export' && (
            <div className="space-y-6 max-w-xl">
              <div className="p-5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 space-y-3">
                <h4 className="font-display font-bold text-sm text-stone-900 dark:text-stone-100">
                  Export Portfolio Data (JSON)
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  Download a complete backup JSON copy of your portfolio configurations, projects, and skills.
                </p>
                <button
                  type="button"
                  onClick={handleExportJSON}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold text-white bg-stone-900 dark:bg-stone-100 dark:text-stone-900"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Backup JSON</span>
                </button>
              </div>

              <div className="p-5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 space-y-3">
                <h4 className="font-display font-bold text-sm text-stone-900 dark:text-stone-100">
                  Import Portfolio Data
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  Upload a previously saved portfolio JSON file to restore your customizations.
                </p>
                <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 cursor-pointer hover:bg-stone-100">
                  <Upload className="w-4 h-4" />
                  <span>Select JSON File</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportJSON}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="p-5 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-rose-50/40 dark:bg-rose-950/20 space-y-3">
                <h4 className="font-display font-bold text-sm text-rose-900 dark:text-rose-300">
                  Reset to Amyy Default Portfolio
                </h4>
                <p className="text-xs text-rose-800/80 dark:text-rose-400 leading-relaxed">
                  Revert all customized details back to Amyy's original University of Sindh resume data.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm('Reset portfolio to Amyy default resume details?')) {
                      onReset();
                      onClose();
                    }
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-rose-700 bg-white dark:bg-rose-950 border border-rose-300 dark:border-rose-800 hover:bg-rose-100/50"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All to Defaults</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-stone-100/80 dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-stone-500 font-mono">
            Edits are saved directly in your browser's local storage.
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-800"
            >
              Done
            </button>
            <button
              type="button"
              onClick={handleSaveAll}
              className="inline-flex items-center gap-1 px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-stone-900 dark:bg-stone-100 dark:text-stone-900"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
