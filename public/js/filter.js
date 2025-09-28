// /public/js/filter.js
  document.querySelectorAll('.filter').forEach(filterEl => {
    filterEl.addEventListener('click', () => {
      const category = filterEl.querySelector('.categories').innerText.trim();
      const encodedCategory = encodeURIComponent(category);
      window.location.href = `/listings/filter?category=${encodedCategory}`;
    });
  });

  let taxSwitch = document.getElementById('switchCheckDefault');
  taxSwitch.addEventListener("click",()=>{
    let taxInfo = document.querySelectorAll('.tax-info')
    for(info of taxInfo){
      if(info.style.display!='inline') info.style.display='inline';
      else{
        info.style.display='none';
      }
    }
  })

