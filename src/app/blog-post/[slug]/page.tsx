import React from "react";
import Details from "@/app/components/Blog-Detail/Details";
import ReadNext from "@/app/components/Blog-Detail/ReadNext";
import JoinTeam from "@/app/components/Home/JoinTeam";

interface BlogPostProps {
  params: { slug: string };
}

export default function BlogPostPage({ params }: BlogPostProps) {
  const decodedSlug = decodeURIComponent(params.slug);
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      <Details params={{ slug: decodedSlug }} />
      <ReadNext />
      <div className="lg:mt-0 -mt-14 lg:px-16 xl:px-16 md:px-6 sm:p-5 custom-px-main">
        <JoinTeam />
      </div>
    </div>
  );
}