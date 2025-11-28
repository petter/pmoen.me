export default function BlogLayout({ children }: LayoutProps<'/blog'>) {
  return <div className="mx-auto max-w-3xl">{children}</div>;
}
