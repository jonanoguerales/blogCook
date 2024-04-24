import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

interface CloudinaryResponse {
  public_id: string;
  version: number;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  original_filename: string;
}

cloudinary.config({
  cloud_name: "dpauhj4zu",
  api_key: "988287673892132",
  api_secret: process.env.CLOUDINARY_SECRET,
});
export async function POST(request: Request) {
  const data = await request.formData();
  const file = data.get("file");
  if (!file) {
    return NextResponse.json("falta imagen", { status: 400 });
  }

  const bytes = await (file as Blob).arrayBuffer();
  const buffer = Buffer.from(bytes);
  //espacio en memoria para poder utilizar, y poder subirlo a la nuve
  const respuesta = await new Promise<CloudinaryResponse>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream((error, result) => {
        if (error) {
          reject(error);
        } else if (result) {
          resolve(result);
        } else {
          reject(new Error("Upload resulted in undefined response"));
        }
      })
      .end(buffer);
  });

  return NextResponse.json({
    message: "imagen subida",
    url: respuesta.secure_url,
  });
}
