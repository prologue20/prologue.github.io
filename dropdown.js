const fileList = document.getElementById('file-list');
const folderPath = './'; // adjust this to your folder path

fetch(folderPath)
  .then(response => response.json())
  .then(data => {
    const files = data.files;
    const htmlFiles = files.filter(file => file.endsWith('.html'));
    const subFolders = files.filter(file => file.isDirectory());

    htmlFiles.forEach(file => {
      const listItem = document.createElement('li');
      const link = document.createElement('a');
      link.href = file;
      link.textContent = file.replace('.html', '');
      listItem.appendChild(link);
      fileList.appendChild(listItem);
    });

    subFolders.forEach(folder => {
      const listItem = document.createElement('li');
      const button = document.createElement('button');
      button.className = 'nav-link dropdown-btn';
      button.dataset.dropdown = folder;
      button.textContent = folder;
      button.addEventListener('click', () => {
        const dropdown = document.getElementById(folder);
        dropdown.classList.toggle('show');
      });
      listItem.appendChild(button);
      fileList.appendChild(listItem);

      const dropdown = document.createElement('div');
      dropdown.id = folder;
      dropdown.className = 'dropdown';

      fetch(folderPath + folder)
        .then(response => response.json())
        .then(subData => {
          const subFiles = subData.files;
          subFiles.forEach(subFile => {
            const subListItem = document.createElement('li');
            const subLink = document.createElement('a');
            subLink.href = folder + '/' + subFile;
            subLink.textContent = subFile.replace('.html', '');
            subListItem.appendChild(subLink);
            dropdown.appendChild(subListItem);
          });
        });

      fileList.appendChild(dropdown);
    });
  });
