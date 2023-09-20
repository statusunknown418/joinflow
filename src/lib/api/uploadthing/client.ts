import { generateComponents } from "@uploadthing/react";
import { JoinflowAppRouter } from "./core";

export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents<JoinflowAppRouter>();
