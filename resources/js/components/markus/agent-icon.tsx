import {
    Bot,
    Code,
    FileText,
    Linkedin,
    MessageSquare,
    Search,
    Share2,
} from 'lucide-react';
import type { LucideIcon, LucideProps } from 'lucide-react';

const ICONS: Record<string, LucideIcon> = {
    bot: Bot,
    code: Code,
    'file-text': FileText,
    linkedin: Linkedin,
    'message-square': MessageSquare,
    search: Search,
    'share-2': Share2,
};

type Props = LucideProps & { name: string };

export function AgentIcon({ name, ...rest }: Props) {
    const Icon = ICONS[name] ?? Bot;

    return <Icon {...rest} />;
}
