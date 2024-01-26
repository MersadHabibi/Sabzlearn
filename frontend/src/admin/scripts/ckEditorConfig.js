import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

let editor = null

const ckEditor = async () => {
  return await ClassicEditor.create(document.querySelector("#editor"), {
    toolbar: ["heading", "|", "bold", "italic", "link", "bulletedList", "numberedList", "blockQuote"],
    heading: {
      options: [
        { model: "paragraph", title: "Paragraph", class: "ck-heading_paragraph" },
        { model: "heading2", view: "h2", title: "Heading 2", class: "ck-heading_heading2" },
        { model: "heading3", view: "h3", title: "Heading 3", class: "ck-heading_heading3" },
        { model: "heading4", view: "h4", title: "Heading 4", class: "ck-heading_heading4" },
      ],
    },
    language: {
      ui: "fa",
    },
  })
    .then(editor => {
      return editor;
    })
    .catch(error => {
      console.error(error);
    });
};

export default ckEditor
