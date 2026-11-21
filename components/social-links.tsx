import { FaGithub, FaLinkedin, FaBluesky, FaXTwitter } from 'react-icons/fa6';
import { twMerge } from 'tailwind-merge';

const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/petter', icon: FaGithub },
  {
    label: 'Bluesky',
    href: 'https://bsky.app/profile/pmoen.me',
    icon: FaBluesky,
  },
  { label: 'X (Twitter)', href: 'https://x.com/pettersmoen', icon: FaXTwitter },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/pettersmoen',
    icon: FaLinkedin,
  },
] as const;

interface SocialLinksProps {
  className?: string;
  iconClassName?: string;
}

export function SocialLinks({ className, iconClassName }: SocialLinksProps) {
  return (
    <div className={twMerge('flex items-center gap-1', className)}>
      {SOCIAL_LINKS.map((social) => {
        const Icon = social.icon;
        return (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            title={social.label}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-stone-400 transition-all duration-200 hover:-translate-y-0.5 hover:text-amber-300"
          >
            <Icon
              aria-hidden="true"
              className={twMerge('h-[18px] w-[18px]', iconClassName)}
            />
          </a>
        );
      })}
    </div>
  );
}
