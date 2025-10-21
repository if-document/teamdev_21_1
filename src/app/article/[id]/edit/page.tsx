"use client";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { deletePost } from "@/lib/posts";

export default function ArticleEditPage() {
  // dummy data
  const [content, setContent] = useState(
    "We can come through this trying time stronger, and with a renewed sense of purpose and respect for one another. The pandemic has shown us that it is not only our troops who are willing to offer the ultimate sacrifice for the safety of the community. Americans in hospitals, grocery stores, post offices, and elsewhere have put their lives on the line in order to serve their fellow citizens and their country. We know that we are better than the abuse of executive authority that we witnessed in Lafayette Square. We must reject and hold accountable those in office who would make a mockery of our Constitution. At the same time, we must remember Lincoln's better angels, and listen to them, as we work to unite.",
  );

  const router = useRouter();
  const params = useParams();
  const currentId = Number(params.id);

  const handleDelete = useCallback(async () => {
    console.log(`<Delete ${currentId}>`);

    if (!currentId) {
      console.log("Error: invalid ID.");
      return;
    }

    if (!confirm("Delete current article ?")) {
      console.log("Delete Canceled.");
      return;
    }

    try {
      await deletePost(currentId);
      console.log("delete completed.");
      router.push("/"); // ホームページへ復帰する
    } catch (err) {
      console.log("Error: invalid ID.");
      console.error(err);
    }
  }, [currentId, router]);

  return (
    <div className="w-full max-w-[1492px] mx-auto px-[16px]">
      <form>
        <Input
          type="text"
          name="title"
          placeholder="Title"
          className="text-[clamp(32px,5.2vw,75px)] font-bold leading-[1.1] my-[1em] h-[1.5em] border-0 bg-[#F5F5F5] focus-visible:outline-none focus-visible:bg-[#fff] focus-visible:ring-0 shadow-none"
        />

        <div className="border-dotted border-[2px] border-[#000] rounded-[clamp(16px,2.8vw,40px)] [aspect-ratio:73/30] flex flex-col items-center justify-evenly bg-[#fff] p-[60px] gap-[2em] my-[2.5em]">
          <svg
            role="img"
            width="100"
            height="100"
            viewBox="0 0 102 108"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[clamp(50px,7vw,100px)] h-[clamp(50px,7vw,100px)]"
          >
            <title>↑</title>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2.85833 49.1852C0.286807 51.8162 0.286807 56.0812 2.85833 58.7122C5.42985 61.341 9.59256 61.3425 12.1641 58.7161L44.3949 25.7883V101.221C44.3949 104.949 47.351 107.974 50.9933 107.974C54.6357 107.974 57.5918 104.949 57.5918 101.221V25.7883L89.7321 58.7369C92.3112 61.388 96.5115 61.3896 99.0981 58.7416C101.685 56.0943 101.685 51.8031 99.0981 49.1558L51.5137 0.457904C51.2271 0.162307 50.7596 0.162307 50.473 0.457904L2.85833 49.1852Z"
              fill="#94A2AB"
            />
          </svg>

          <Button
            asChild
            className="text-[clamp(16px,2.3vw,33px)] text-[#fff] bg-[#18A0FB] px-[2em] py-[1em] font-bold block rounded-full h-auto cursor-pointer"
          >
            <label htmlFor="upload_image">Upload Image</label>
          </Button>

          <input
            type="file"
            accept="image/*"
            name="upload_image"
            id="upload_image"
            className="hidden"
          />
        </div>

        <div className="flex justify-end my-8">
          <div className="flex flex-col gap-[6px] w-full max-w-[240px] min-w-[fit-content]">
            <label htmlFor="category_id">Category</label>
            <Select name="category_id">
              <SelectTrigger id="category_id">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent className="text-[clamp(18px,1.8vw,26px)] w-full">
                <SelectItem value="1">Category A</SelectItem>
                <SelectItem value="2">Category B</SelectItem>
                <SelectItem value="3">Category C</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Textarea
          name="content"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="bg-[#F5F5F5] text-[#555] border-0 rounded-[clamp(16px,2.8vw,40px)] [aspect-ratio:73/30] p-[0.5em] md:p-[1em] text-[clamp(18px,1.8vw,26px)] md:text-[clamp(18px,1.8vw,26px)] min-h-[14em] mt-[1em] mb-[2em] placeholder:text-[#888] focus-visible:outline-none focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:bg-[#fff] shadow-md md:shadow-lg"
        />

        <div className="flex justify-center md:justify-end my-[2em] gap-[0.5em]">
          <Button
            type="submit"
            className="px-[4em] py-[1.3em] bg-[#18A0FB] text-[#fff] text-[clamp(16px,1.5vw,22px)] font-bold"
          >
            Create
          </Button>
          <Button
            type="button"
            onClick={handleDelete}
            className="px-[4em] py-[1.3em] bg-[#18A0FB] text-[#fff] text-[clamp(16px,1.5vw,22px)] font-bold"
          >
            Delete
          </Button>
        </div>
      </form>
    </div>
  );
}
