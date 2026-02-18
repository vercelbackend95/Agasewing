interface Avatar {
  imageUrl: string;
  profileUrl: string;
}

interface AvatarCirclesProps {
  numPeople?: number;
  avatarUrls: Avatar[];
}

const AvatarCircles = ({ numPeople, avatarUrls }: AvatarCirclesProps) => {
  return (
    <div className="flex items-center">
      <div className="flex -space-x-4">
        {avatarUrls.map(({ imageUrl, profileUrl }, index) => (
          <span key={`${profileUrl}-${index}`} className="inline-block" aria-hidden="true">
            <img
              src={imageUrl}
              alt="Contributor avatar"
              className="size-10 rounded-full border-2 border-white object-cover"
              loading="lazy"
            />
          </span>
        ))}
      </div>
      {typeof numPeople === "number" ? (
        <span className="ml-3 text-sm font-medium text-white/90">+{numPeople}</span>
      ) : null}
    </div>
  );
};

export { AvatarCircles };
