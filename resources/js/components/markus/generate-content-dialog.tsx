import { useState } from 'react';
import { router } from '@inertiajs/react';
import { Loader2, Sparkles } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { MarkusButton } from '@/components/markus/markus-ui';
import { generate } from '@/routes/drafts';
import type { DraftType } from '@/types/marketing';

const CONTENT_TYPES: { value: DraftType; label: string }[] = [
    { value: 'blog_post', label: 'Blog Post' },
    { value: 'social_post', label: 'Social Media Post' },
    { value: 'email', label: 'Email' },
    { value: 'linkedin_article', label: 'LinkedIn Article' },
    { value: 'newsletter', label: 'Newsletter' },
    { value: 'landing_page', label: 'Landing Page' },
    { value: 'reddit_comment', label: 'Reddit Comment' },
];

export function GenerateContentDialog({ agents }: { agents: { id: number; name: string }[] }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        agent_id: agents[0]?.id?.toString() ?? '',
        title: '',
        type: 'blog_post' as DraftType,
        prompt: '',
        target_channel: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        router.post(generate.url(), {
            agent_id: Number(form.agent_id),
            title: form.title,
            type: form.type,
            prompt: form.prompt,
            target_channel: form.target_channel || undefined,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setOpen(false);
                setForm({ agent_id: agents[0]?.id?.toString() ?? '', title: '', type: 'blog_post', prompt: '', target_channel: '' });
            },
            onFinish: () => setLoading(false),
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <MarkusButton>
                    <Sparkles className="mr-2 h-4 w-4" /> Generate Content
                </MarkusButton>
            </DialogTrigger>
            <DialogContent className="border-[#1F1F23] bg-[#111114] text-[#E0E0E1]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Generate Content</DialogTitle>
                        <DialogDescription className="text-[#6B6B76]">
                            Ask an agent to generate marketing content for you.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="mt-4 space-y-4">
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-[#9A9A9E]">
                                Agent
                            </label>
                            <select
                                value={form.agent_id}
                                onChange={(e) => setForm({ ...form, agent_id: e.target.value })}
                                className="w-full rounded-md border border-[#1F1F23] bg-[#0E0E11] px-3 py-2 text-sm text-[#E0E0E1] focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                                required
                            >
                                {agents.map((agent) => (
                                    <option key={agent.id} value={agent.id}>
                                        {agent.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-[#9A9A9E]">
                                Content Type
                            </label>
                            <select
                                value={form.type}
                                onChange={(e) => setForm({ ...form, type: e.target.value as DraftType })}
                                className="w-full rounded-md border border-[#1F1F23] bg-[#0E0E11] px-3 py-2 text-sm text-[#E0E0E1] focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                                required
                            >
                                {CONTENT_TYPES.map((type) => (
                                    <option key={type.value} value={type.value}>
                                        {type.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-[#9A9A9E]">
                                Title
                            </label>
                            <input
                                type="text"
                                value={form.title}
                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                                placeholder="e.g. How AI is Transforming SEO in 2026"
                                className="w-full rounded-md border border-[#1F1F23] bg-[#0E0E11] px-3 py-2 text-sm text-[#E0E0E1] placeholder:text-[#4B4B52] focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                                required
                            />
                        </div>

                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-[#9A9A9E]">
                                Instructions
                            </label>
                            <textarea
                                value={form.prompt}
                                onChange={(e) => setForm({ ...form, prompt: e.target.value })}
                                placeholder="Describe what you want the agent to write..."
                                rows={4}
                                className="w-full resize-none rounded-md border border-[#1F1F23] bg-[#0E0E11] px-3 py-2 text-sm text-[#E0E0E1] placeholder:text-[#4B4B52] focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                                required
                            />
                        </div>

                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-[#9A9A9E]">
                                Target Channel <span className="text-[#4B4B52]">(optional)</span>
                            </label>
                            <input
                                type="text"
                                value={form.target_channel}
                                onChange={(e) => setForm({ ...form, target_channel: e.target.value })}
                                placeholder="e.g. Blog, LinkedIn, Email"
                                className="w-full rounded-md border border-[#1F1F23] bg-[#0E0E11] px-3 py-2 text-sm text-[#E0E0E1] placeholder:text-[#4B4B52] focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                            />
                        </div>
                    </div>

                    <DialogFooter className="mt-6">
                        <MarkusButton type="button" variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </MarkusButton>
                        <MarkusButton type="submit" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            <Sparkles className="mr-2 h-4 w-4" /> Generate
                        </MarkusButton>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
