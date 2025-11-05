import type { Album } from "../@types/album";

type AudioQualityProps = {
  album: Album;
};

export default function AudioQuality({ album }: AudioQualityProps) {
  const title = `${album.maximum_bit_depth}-bit / ${album.maximum_sampling_rate} kHz`;

  return (
    <div className="flex-none">
      {album.hires ? (
        <img
          src="/hires.jpg"
          alt="Hi-Res Audio"
          title={title}
          className="w-8 select-none"
        />
      ) : (
        <img
          src="/cd.svg"
          alt="CD Quality"
          title={title}
          className="w-8 select-none dark:invert"
        />
      )}
    </div>
  );
}
