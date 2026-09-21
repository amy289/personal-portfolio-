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
  Briefcase, 
  User, 
  Layers, 
  Sparkles,
  Code
} from 'lucide-react';
import { PortfolioData, ProjectItem, SkillItem, ContactSubmission } from '../types';

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
  const [activeTab, setActiveTab] = useState<'profile' | 'projects' | 'skills' | 'messages' | 'export'>('profile');
  const [formData, setFormData] = useState<PortfolioData>(portfolio);
  const [savedToast, setSavedToast] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isAddingProject, setIsAddingProject] = useState(false);

  // New skill input
  const [newSkill, setNewSkill] = useState<{
    name: string;
    category: 'frontend' | 'backend' | 'architecture' | 'design';
    level: number;
    experienceYears: string;
  }>({
    name: '',
    category: 'frontend',
    level: 90,
    experienceYears: '3 yrs'
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
    downloadAnchor.setAttribute("download", `${formData.name.toLowerCase()}-portfolio.json`);
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
        if (parsed.name && parsed.projects) {
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
        experienceYears: newSkill.experienceYears,
        isFavorite: false
      }
    ];
    setFormData({ ...formData, skills: updatedSkills });
    setNewSkill({ name: '', category: 'frontend', level: 90, experienceYears: '3 yrs' });
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
                Live Portfolio Customizer
              </h3>
              <p className="text-xs text-stone-500">
                Personalize your name, bio, projects, and skills in real-time.
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
            { id: 'profile', label: 'Basic Profile', icon: User },
            { id: 'projects', label: `Projects (${formData.projects.length})`, icon: Briefcase },
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.socials.email}
                    onChange={(e) => setFormData({
                      ...formData,
                      socials: { ...formData.socials, email: e.target.value }
                    })}
                    className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Short Bio (Elevator Pitch)
                </label>
                <textarea
                  rows={3}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 resize-y"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  In-Depth About Story
                </label>
                <textarea
                  rows={4}
                  value={formData.aboutStory}
                  onChange={(e) => setFormData({ ...formData, aboutStory: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 resize-y"
                />
              </div>

              <div className="pt-2 border-t border-stone-200 dark:border-stone-800">
                <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
                  Social Links
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="url"
                    placeholder="GitHub URL"
                    value={formData.socials.github || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      socials: { ...formData.socials, github: e.target.value }
                    })}
                    className="px-3 py-1.5 text-xs bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-lg"
                  />
                  <input
                    type="url"
                    placeholder="LinkedIn URL"
                    value={formData.socials.linkedin || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      socials: { ...formData.socials, linkedin: e.target.value }
                    })}
                    className="px-3 py-1.5 text-xs bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-lg"
                  />
                  <input
                    type="url"
                    placeholder="Twitter/X URL"
                    value={formData.socials.twitter || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      socials: { ...formData.socials, twitter: e.target.value }
                    })}
                    className="px-3 py-1.5 text-xs bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-700 rounded-lg"
                  />
                </div>
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
                    {isAddingProject ? 'Add New Project' : 'Edit Project'}
                  </h4>
                  
                  {/* Inline Project Form */}
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
                      tags: target.projectTags.value.split(',').map((t: string) => t.trim()).filter(Boolean),
                      liveUrl: target.projectLiveUrl.value,
                      githubUrl: target.projectGithubUrl.value,
                      featured: target.projectFeatured.checked
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
                        <select
                          name="projectCategory"
                          defaultValue={editingProject?.category || 'Full Stack'}
                          className="w-full px-3 py-1.5 text-xs bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg"
                        >
                          <option value="Full Stack">Full Stack</option>
                          <option value="Frontend">Frontend</option>
                          <option value="UI Systems">UI Systems</option>
                          <option value="Dev Tools">Dev Tools</option>
                        </select>
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
                        Detailed Description
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
                          Tech Tags (comma separated)
                        </label>
                        <input
                          name="projectTags"
                          defaultValue={editingProject?.tags.join(', ') || 'React, TypeScript, Tailwind'}
                          className="w-full px-3 py-1.5 text-xs bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-600 dark:text-stone-400 mb-1">
                          Year
                        </label>
                        <input
                          name="projectYear"
                          defaultValue={editingProject?.year || '2025'}
                          className="w-full px-3 py-1.5 text-xs bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg"
                        />
                      </div>
                      <div className="flex items-center gap-2 pt-5">
                        <input
                          type="checkbox"
                          id="projectFeatured"
                          name="projectFeatured"
                          defaultChecked={editingProject?.featured ?? true}
                          className="rounded"
                        />
                        <label htmlFor="projectFeatured" className="text-xs text-stone-700 dark:text-stone-300 font-medium">
                          Featured on Hero
                        </label>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-600 dark:text-stone-400 mb-1">
                          Live Demo URL
                        </label>
                        <input
                          name="projectLiveUrl"
                          type="url"
                          defaultValue={editingProject?.liveUrl || ''}
                          placeholder="https://..."
                          className="w-full px-3 py-1.5 text-xs bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-stone-600 dark:text-stone-400 mb-1">
                          GitHub Repo URL
                        </label>
                        <input
                          name="projectGithubUrl"
                          type="url"
                          defaultValue={editingProject?.githubUrl || ''}
                          placeholder="https://github.com/..."
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
                    Active Projects
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
                        <span className="text-xs text-stone-400">{proj.year}</span>
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
                    Technology Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. GraphQL, Rust"
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
                    <option value="frontend">Frontend</option>
                    <option value="backend">Backend</option>
                    <option value="architecture">Architecture/DevOps</option>
                    <option value="design">Design & Systems</option>
                  </select>
                </div>

                <div className="w-24">
                  <label className="block text-[11px] font-semibold text-stone-600 dark:text-stone-400 mb-1">
                    Mastery %
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
                        {skill.category} • {skill.level}%
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
                  No contact messages received yet. Test the contact form on your portfolio to see incoming notes here!
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
                          {msg.name} ({msg.email})
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
                          href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || 'Portfolio Inquiry')}`}
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
                  Download a complete backup copy of your customized portfolio configurations, projects, and bio settings.
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
                  Upload a previously saved portfolio JSON file to instantly restore your custom details.
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
                  Reset to Original Amy Template
                </h4>
                <p className="text-xs text-rose-800/80 dark:text-rose-400 leading-relaxed">
                  Discard all customized changes and revert back to the original sample portfolio data.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm('Are you sure you want to reset all portfolio fields to defaults?')) {
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
            Changes save directly to your browser's local storage.
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
