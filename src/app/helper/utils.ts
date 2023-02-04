export class Utils {
    public static numberControl (id : number) : boolean {
        if(id == 0 || id == null || typeof id ==="undefined")
            return false;
        
        return true;
    }

    public static isEmptyOrNull(str : string) : boolean {
        if(str.trim() == '' || str == null || typeof str === "undefined")
            return false;
        return true;
    }
}