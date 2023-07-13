import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UploadDropzone } from "@/components/upload-button";
import Logo from "@/components/logo";
import ThemeSwitch from "@/components/theme-switch";
import { twMerge } from "tailwind-merge";
import { OurFileRouter } from "@/app/api/uploadthing/core";

interface DropFileProps {
  className?: string;
}

const DropFile: React.FC<DropFileProps> = ({ className }) => {
  return (
    <Card className={twMerge("flex-col p-6 overflow-y-auto", className)}>
      <CardHeader>
        <ThemeSwitch />
        <div className="flex justify-center items-center">
          <Logo width={50} height={50} className="mb-2" />
        </div>
        <CardTitle>Upload and attach files</CardTitle>
        <CardDescription>Upload and attach your files here</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <UploadDropzone endpoint="fileUploader" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Submit</Button>
      </CardFooter>
    </Card>
  );
};

export default DropFile;
