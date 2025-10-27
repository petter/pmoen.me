export default function CenteredLayout({ children }: LayoutProps<'/blog'>) {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-4 px-4 py-8">
      {children}
    </div>
  );
}
