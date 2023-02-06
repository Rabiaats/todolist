
let listeyeekle = document.querySelector("#liveToastBtn");

let listeinputu = document.querySelector("#task");

let listedizisi=[];

const liste = document.querySelector("#list")

sayfayenileninceeklenenkalsın();

// LOCAL STORAGE DEKİ LİSTE ELEMANLARI SAYFA YENİLENİNCE GİTMESİN//

function sayfayenileninceeklenenkalsın(){

    localdelistedizisineekleme();     //LOCALDEKİ FONKSİYONUNA BAK,  ELEMAN ARRAY'İMDEN SİLİNMİŞ Mİ YOKSA HALA İÇİNDE Mİ //

    listedizisi.forEach(function (kalsın) {  
        
        yenioge(kalsın);  //İÇİNDE İSE ARRAY'DEKİ ELEMANI/ELEMANLARI TEKRAR LİSTEYE EKLEME FONKSİYONUNA GÖTÜR //

    
})

}

//İMPUTTA GİRİLEN DEĞERİ ALMA VE TOAST EKLEME//

function newElement(){


    const deger= listeinputu.value.trim()   //listeinputu.value inputa girilen girdi(#task) trim() yaparak space tuşuna basınca kabul etmiyor//

    if(deger==""){  //birşey yazılmadan direk eklemeye çalışmak demek//
    
        $('.error.toast').toast("show") //BOOTSTRAP TOASTTA BİLGİSİ VAR//
        
    }

    else{

        yenioge(deger)  //imputtaki valuemizi listeye eleman olarak ekleme fonksiyonu//

        listeinputu.value=""   //button a bastıktan sonra imput girdisini temizler//

        $('.success.toast').toast("show")

        yenieleman(deger) //local storage e elemanı ekleme fonksiyonu//

    }

    e.preventDefault(); 

}


//İMPUTTAKİ VALUEMİZİ LİSTEYE OLARAK EKLEMEK FONKSİYONU//

function yenioge(listeninogesi){  

    const yenili =` <li class="listem">${listeninogesi}<i class="fa fa-times close"></i></li>`;  //CLOSE CLASSINI HTML KISMINDA EKLEDİM VE ÜSTÜ ÇİZİLMESİN DİYE CSS DOSYASINDA CLOSe CLASINA text-decoration: none; ekledim//

    liste.innerHTML += yenili;
}

//CLOSE CLASINI ÇALIŞTIRARAK ELEMAN SİLME VE CHECKED CLASSINI TOGGLE EDEREK KELİMELERİN ÜSTÜNÜ ÇİZME//

liste.addEventListener('click', e=>{ //liste(#list)

    if(e.target.classList.contains('close')){

       const ebeveyn = e.target.parentElement //ul da li ye ebeveyn dedim//

            ebeveyn.remove()

        const silinen = ebeveyn.firstChild.textContent   //LOCALDEN SİLME FONKSİYONU// //ebeveynimizin metin elemanıı olan çocuğu aslında listeinputu.value.trim() demiş oluyorum//
            
            localdensil(silinen)

    }

    if(e.target.classList.contains('listem')){ //LİSTEM CLASSI HTML DE Lİ YE EKLEDİĞİM BİR CLASS//

        e.target.classList.toggle('checked')   //VARSA TERSİNE ÇEVİR YOKSA ÇALIŞTIR DEMEK//

    } //E.TARGET.CLASSLİST SEÇTİĞİM CLASSTA ANLAMINDA; BU CLASSIN ELEMANLARINA TIKLADIĞIMDA ÇALIŞSIN, BU ŞEKİLDE ANLADIM//
})


//LOCAL STORAGE  OLUŞTURDUĞUM ARRAY'E(LİSTEDİZİSİ) DEGER(LİSTEİNPUTU.VALUE.TRİM()) EKLEME//

function yenieleman(degerimiz) {
    localdelistedizisineekleme();
    listedizisi.push(degerimiz);
    localStorage.setItem("localliste", JSON.stringify(listedizisi)) 
}

// LOCAL STORAGE, SİLİNEN VE EKLENEN ELEMANLARI KONTROL EDİP SAYFA YENİLENİNCE SİLİNMEYEN ELEMANLARI TEKRAR EKLE DER VE SAYFAYENİLENCEKALSIN YAPARIZ//

function localdelistedizisineekleme() {
    if (localStorage.getItem("localliste") === null) {   //SAYFA AÇILDIĞINDA LOCAL HİÇ KAYITLI ELEMAN YOK ANLAMINDA//
        listedizisi = [];   //SAYFAYA EKLENECEK ELEMAN YOK//

    } else {
        listedizisi = JSON.parse(localStorage.getItem("localliste"))  //LOCALDE ELEMAN VAR , ARRAY'İNE EKLE VE SAYFAYENİLENCEKALSIN YAP//
    }
}

// LOCAL STORAGEDEN DEGER İ SİLMEK//

function localdensil(silinenler) {
    localdelistedizisineekleme();
    listedizisi.forEach(function (silinecek, index) {   //DİZİDE İNDEXE GÖRE ELEMANLARA BAK//
        if (silinenler === silinecek) {     //İNDEXTEKİ DEGER SİLİNENLER'E  EŞİTSE//
            listedizisi.splice(index, 1);    //SİL//
        }
    });
    localStorage.setItem("localliste", JSON.stringify(listedizisi)); 
}

//LOCAL STORAGE İ PEK ANLAMADIM AMA PRATİK YAPTIKCA GELİŞİR//