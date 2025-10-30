type TagBadgeProps = {
  tag: string;
};

export function TagBadge({ tag }: TagBadgeProps) {
  return (
    <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-xs rounded whitespace-nowrap">
      {tag}
    </span>
  );
}
