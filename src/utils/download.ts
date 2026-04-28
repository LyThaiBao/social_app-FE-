//--------------------Download File-------------------------------
    export const handleDownload = async (url: string, fileName: string) => {
    try {
        //fetch ve de vao mem
        const response = await fetch(url);
        const blob = await response.blob();
        
        // tao url gia
        const blobUrl = window.URL.createObjectURL(blob);
        
        // tao the a cho no tro ve 
        const link = document.createElement('a');
        link.href = blobUrl;
        link.setAttribute('download', fileName); // bat no click ngay vs ten file minh dua vao
        //gan vao dom
        document.body.appendChild(link);
        link.click();
        //Dọn dẹp
        link.parentNode?.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
        console.error("Download failed", error);
    }
};