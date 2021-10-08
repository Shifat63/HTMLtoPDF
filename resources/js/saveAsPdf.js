function saveAsPdf(divId, fileName){
    html2canvas(document.getElementById(divId), {
        //scale: 2,
        onrendered: function(canvas) {
            // Converting into png image
            var imgData = canvas.toDataURL('image/png');
            //a4 page size
            var pageHeight = 297;
            var pageWidth = 210;
            //Image width is 200mm. Leaving 5mm space on each side(right & left)
            var imgWidth = 200;
            //Potrait, size in mm, a4 paper size
            var pdf = new jsPDF('p', 'mm', 'a4');
            if(canvas.height < canvas.width)
            {
                pageHeight = 210;
                pageWidth = 297;
                imgWidth = 287;
                //Landscape, size in mm, a4 paper size
                pdf = new jsPDF('l', 'mm', 'a4');
            }
            //Converting image height to mm based on mm to pixel ratio
            var imgHeight = canvas.height * imgWidth / canvas.width;
            var position = 0;
            pdf.addImage(imgData, 'PNG', 5, position, imgWidth, imgHeight);
            var heightLeft = imgHeight - pageHeight;
            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 5, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }
            pdf.save(fileName+'.pdf');
        }
    });
}