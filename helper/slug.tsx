function convertToSlug(title: string) {
  // Menghapus karakter non-alfanumerik dan mengganti spasi dengan tanda hubung

  return title
    .toLowerCase()
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .replace(/\s+/g, "-");
}

export default convertToSlug;