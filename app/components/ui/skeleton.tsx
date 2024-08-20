function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`animate-pulse rounded-md ${className}`} {...props} />;
}

export default Skeleton;
