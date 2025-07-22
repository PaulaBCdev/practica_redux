import clsx from "clsx";
import "./tags-list.css";

interface TagsListProps {
  tags: string[];
  className?: string;
}

const TagsList = ({ tags, className }: TagsListProps) => {
  return (
    <div className={clsx("ad-tags", className)}>
      {tags.map((tag) => (
        <span key={tag} className="tag">
          {tag}
        </span>
      ))}
    </div>
  );
};
export default TagsList;
