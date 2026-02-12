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
          <a
            key={`${profileUrl}-${index}`}
            href={profileUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-block"
            aria-label="Open contributor profile"
          >
            <img
              src={imageUrl}
              alt="Contributor avatar"
              className="size-10 rounded-full border-2 border-white object-cover"
              loading="lazy"
            />
          </a>
        ))}
      </div>
      {typeof numPeople === "number" ? (
        <span className="ml-3 text-sm font-medium text-white/90">+{numPeople}</span>
      ) : null}
    </div>
  );
};

export { AvatarCircles };
