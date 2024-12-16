import styles from "./styles.css?inline";
const imageInteraction = (editor) => {
  // دالة لرفع وعرض معاينة الصورة في القائمة الجانبية
  const handleImageUpload = (fileInput, selectedComponent) => {
    if (!selectedComponent) {
      console.error("No image component selected");
      return;
    }

    const file = fileInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        // عند تحميل الصورة، نقوم بتحديث الصورة في منطقة الاسقاط
        // إذا كانت الصورة التي تم تحديدها هي صورة من نوع "image"
        if (selectedComponent && selectedComponent.get("type") === "image") {
          selectedComponent.set("src", e.target.result); // تحديث مصدر الصورة في منطقة الاسقاط
        }
      };
      reader.readAsDataURL(file); // قراءة محتوى الصورة
    }
  };

  const addImageByUrl = (url, selectedComponent) => {
    if (url) {
      // إذا كان الرابط غير فارغ
      selectedComponent.set("src", url); // تحديث مصدر الصورة
    }
  };

  // دالة لفتح المودال الخاص بإضافة صورة داخل القائمة الجانبية
  const openImageModal = (selectedComponent) => {
    const preview = document.getElementById("preview");
    // const preview = document.querySelector(
    //   ".gjs-pn-panel.gjs-pn-views-container .content"
    // );
    // تحقق من أن AssetManager تم تهيئته بشكل صحيح
    if (editor.AssetManager) {
      editor.AssetManager.open();
      const previewContainer = document.querySelector(
        ".gjs-am-assets[data-el='assets']"
      );

      // الحصول على الكائن المودالي للمحتوى
      const modalContainer = editor.AssetManager.getContainer();
      if (modalContainer) {
        previewContainer.innerHTML = "";
        editor.AssetManager.close();

        // استنساخ المودال وإضافة المودال الجديد إلى الشاشة
        const imageContent = modalContainer.cloneNode(true);
        preview.innerHTML = "";
        preview.appendChild(imageContent);

        // ربط حدث رفع الصورة بالعنصر الجديد
        const fileInput = imageContent.querySelector("#gjs-am-uploadFile");
        if (fileInput) {
          fileInput.addEventListener("change", (event) =>
            handleImageUpload(event.target, selectedComponent)
          );
        }
        // التعامل مع رابط الصورة
        const urlInput = imageContent.querySelector(".gjs-am-add-field input");
        if (urlInput) {
          const addButton = imageContent.querySelector(".gjs-btn-prim"); // إذا كان هناك زر إضافة
          addButton.addEventListener("click", (e) => {
            e.preventDefault();
            addImageByUrl(urlInput.value, selectedComponent);
          });
        }

        // Adding component styles
        editor.addStyle(styles);
      } else {
        console.error("AssetManager container is not available");
      }
    } else {
      console.error(
        "AssetManager is not initialized or open() function is not available"
      );
    }
  };

  // تأكد من أن AssetManager جاهز قبل تنفيذ أي شيء
  editor.on("assetManagerReady", () => {
    console.log("AssetManager is ready");
    // عندما يتم إضافة صورة جديدة إلى المشروع
    editor.on("component:add", (model) => {
      if (model.get("type") === "image") {
        editor.AssetManager.close();
        openImageModal(model);
      }
    });
  });

  editor.on("component:selected", (model) => {
    if (model.get("type") === "image") {
      openImageModal(model); // إرسال المكون المحدد (الصورة) لتحديثها
    }
  });
};

export default imageInteraction;
