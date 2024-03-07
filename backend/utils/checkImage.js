import imageSize from "image-size";

const base64Regex = /^(data:image\/(jpeg|png|gif);base64,)/;

function verifyBase64Format(base64Data) {
  return base64Regex.test(base64Data);
}

async function checkImage(base64Data) {
  if (!verifyBase64Format(base64Data)) {
    throw new Error("Invalid Base64 format");
  }

  // Remove data URI prefix
  const base64String = base64Data.replace(/^data:image\/\w+;base64,/, "");

  // Decode Base64 string
  const buffer = Buffer.from(base64String, "base64");

  // Check buffer length
  if (buffer.length > 5000000) {
    throw new Error("File size exceeds the limit");
  }

  // Check MIME type
  const mime = base64Data.split(";")[0].split(":")[1];
  if (!mime || !mime.startsWith("image/")) {
    throw new Error("Invalid MIME type");
  }

  // Use image-size to extract image dimensions and type
  const dimensions = imageSize(Buffer.from(base64String, "base64"));

  if (!dimensions || !["jpg", "png", "gif"].includes(dimensions.type)) {
    throw new Error("Invalid image format or dimensions");
  }

  return true;
}

export default checkImage;
