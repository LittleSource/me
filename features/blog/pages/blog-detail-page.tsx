import { SITE_URL } from '@/config';

import { Badge } from '@/components/ui/badge';

import { BytemdViewer } from '@/components/bytemd';
import { GoBack } from '@/components/go-back';
import { IconSolarEyeBold } from '@/components/icons';
import { PreviewQrCode } from '@/components/qr-code';

import { NICKNAME, PATHS } from '@/constants';
import { toFromNow } from '@/lib/utils';
import { formatNum } from '@/utils';

import { BlogEventTracking } from '../components/blog-event-tracking';
import { type Blog } from '../types';

type BlogDetailProps = {
  blog: Blog;
  uv?: number;
};

export const BlogDetailPage = ({ blog, uv = 0 }: BlogDetailProps) => {
  return (
    <div className="md:max-w-screen-md 2xl:max-w-6xl md:px-0 md:mx-auto py-12 md:py-24 grid gap-9 px-6">
      <PreviewQrCode url={`${SITE_URL}/${PATHS.SITE_BLOG}/${blog.slug}`} />
      <article className="max-w-[678px] mx-auto">
        {blog.cover && (
          <img
            src={blog.cover}
            alt={blog.title}
            className="max-w-screen-md 2xl:max-w-6xl h-auto mb-16 w-full"
          />
        )}
        <h1 className="mb-4 text-2xl md:text-4xl font-extrabold ">
          {blog.title}
        </h1>
        <div className="text-sm flex flex-row items-center text-muted-foreground">
          <div>{blog.author ? blog.author : NICKNAME}</div>
          <span className="mx-2">·</span>
          <span>发布于 {toFromNow(blog.createdAt)}</span>
          <span className="mx-2">·</span>
          <div className="flex items-center space-x-1">
            <IconSolarEyeBold />
            <span>{formatNum(uv)} 人看过</span>
          </div>
        </div>
        <BytemdViewer body={blog.body || ''} />
      </article>

      <div className="max-w-[678px] mx-auto w-full pl-6">
        <div className="flex flex-wrap gap-2">
          {blog.tags?.map((el) => (
            <Badge key={el.id} className="md:px-2 md:py-1 md:text-sm">
              {el.name}
            </Badge>
          ))}
        </div>
        <GoBack />
      </div>

      <BlogEventTracking blogID={blog.id} />
    </div>
  );
};
