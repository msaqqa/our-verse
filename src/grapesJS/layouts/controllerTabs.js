// add controller tabs inside style manager
export const controllerTabs = (editor) => {
  const sideContainer = document.querySelector(".gjs-clm-tags");

  const styleHeader = document.getElementById("gjs-clm-up");
  const styleField = document.getElementById("gjs-clm-tags-field");
  const styleInfo = document.getElementsByClassName("gjs-clm-sels-info")[0];
  const stylegSectors = document.getElementsByClassName("gjs-sm-sectors")[0];

  const contentBtn = document.createElement("button");
  contentBtn.classList.add("tabBtn");
  contentBtn.setAttribute("data-item", 0);
  contentBtn.title = "Content";
  contentBtn.innerHTML = `<i class="fa fa-pencil" aria-hidden="true"></i><br/> Contnet`;

  const StyleBtn = document.createElement("button");
  StyleBtn.classList.add("tabBtn");
  StyleBtn.setAttribute("data-item", 1);
  StyleBtn.title = "Style";
  StyleBtn.innerHTML = `<i class="fa fa-adjust" aria-hidden="true"></i><br/> Style`;

  const advancedBtn = document.createElement("button");
  advancedBtn.classList.add("tabBtn");
  advancedBtn.setAttribute("data-item", 2);
  advancedBtn.title = "Advanced";
  advancedBtn.innerHTML = `<i class="fa fa-cog" aria-hidden="true"></i><br/> Advanced`;

  const tabsContainer = document.createElement("div");
  tabsContainer.classList.add("tabsContainer");
  tabsContainer.appendChild(contentBtn);
  tabsContainer.appendChild(StyleBtn);
  tabsContainer.appendChild(advancedBtn);
  sideContainer.insertBefore(tabsContainer, sideContainer.firstChild);

  // content structure
  const contentStructure = document.createElement("div");
  contentStructure.className = "text-content";
  const input = document.createElement("textarea");
  input.rows = "5";
  input.placeholder = "Text Content";
  input.addEventListener("change", (e) => changecContent(e));
  contentStructure.appendChild(input);
  sideContainer.appendChild(contentStructure);

  // advanced structure
  const toggleAdvancedDisplay = (val) => {
    const traitsPanel = document.querySelector(".gjs-traits-cs");
    const traitsLabel = document.querySelector(".gjs-traits-label");
    if (traitsPanel) {
      traitsPanel.style.display = val;
      traitsLabel.style.display = val;
    }
  };

  const toggleStyleDisplay = (val) => {
    styleHeader.style.display = val;
    styleField.style.display = val;
    styleInfo.style.display = val;
    stylegSectors.style.display = val;
  };

  editor.on("component:selected", (component) => {
    if (component) {
      toggleAdvancedDisplay("none");
      if (component.get("type") === "typograph") {
        contentContainer(contentBtn);
      } else {
        styleContainer(StyleBtn);
      }
    }
  });

  const changecContent = (e) => {
    const selected = editor.getSelected();
    const attributes = selected.getAttributes();

    if (attributes) {
      selected.setAttributes({ ...attributes, content: e.target.value });
      editor.store();
    }
  };

  const addActiveClass = (element) => {
    const tabsBtns = document.querySelectorAll(".tabBtn");
    tabsBtns.forEach((item) => {
      item.classList.remove("active");
    });
    element.classList.add("active");
  };

  const contentContainer = async (element) => {
    await editor.stopCommand("core:open-traits");
    const selected = editor.getSelected();
    addActiveClass(element);
    toggleStyleDisplay("none");

    if (selected) {
      if (selected.get("type") === "typograph") {
        input.value = selected.getAttributes().content;
        contentStructure.style.display = "block";
      }
    }
  };

  const styleContainer = (element) => {
    addActiveClass(element);
    contentStructure.style.display = "none";
    editor.stopCommand("core:open-traits");
    toggleStyleDisplay("");
  };

  const advancedContainer = (element) => {
    addActiveClass(element);
    contentStructure.style.display = "none";
    styleHeader.style.display = "none";
    styleField.style.display = "none";
    styleInfo.style.display = "none";
    stylegSectors.style.display = "none";
    const selected = editor.getSelected();
    if (selected) {
      // console.log(editor.Commands.getAll());
      const traits = selected.getTraits();
      let removeTrait;
      traits.forEach((trait) => {
        if (trait.attributes.name === "content") {
          removeTrait = trait;
        }
      });
      const updatedTraits = traits.filter((trait) => trait !== removeTrait);
      // traits.shift();
      selected.setTraits(updatedTraits);
      editor.runCommand("core:open-traits");
      toggleAdvancedDisplay("");
    }
  };

  contentBtn.addEventListener("click", () => contentContainer(contentBtn));
  StyleBtn.addEventListener("click", () => styleContainer(StyleBtn));
  advancedBtn.addEventListener("click", () => advancedContainer(advancedBtn));
};
