import Controls from "./Controls"
import { Button } from "./ui/button"

const Employees = () => {
    
    return <>
        <Controls/>
        <div>
            hhahahah
        </div>
        <Button variant={"default"} onClick={() => { console.log("click")}} >
            Hola
        </Button>
    </>
}

export default Employees
