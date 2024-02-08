import React from "react";
import { Box, Input, Select, Option, Icon, Button } from "../elements";

export default function IconField({ classes, icon, option, activeOption, type, placeholder, passwordVisible,reverse,alert , ...rest}) {
    const [visible, setVisible] = React.useState(false);
    
    return (
        <>
        <Box className={`mc-icon-field ${ classes || "w-md h-sm white" }`}>
            {reverse ? <> 
          {type ?
                <>
                    <Input 
                        type={ visible ? "text" : type || "text" }  
                        placeholder={ type ? placeholder || "Type here..." : "" } 
                        { ...rest } 
                    />
                    {passwordVisible && 
                        <Button 
                            type = "button"
                            className = "material-icons"
                            onClick = {()=> setVisible(!visible)}
                        >
                            { visible ? "visibility_off" : "visibility" }
                        </Button>
                    }
                </>
                :
                <Select { ...rest }>
                    <Option>{ activeOption || "Select Option" }</Option>
                    {option.map((item, index) => (
                        <Option key={ index } value={ item }>{ item}</Option>
                    ))}
                </Select>
            }<Icon type={ icon || "account_circle" } /></>  :             <> <Icon type={ icon || "account_circle" } />
          {type ?
                <>
                    <Input 
                        type={ visible ? "text" : type || "text" }  
                        placeholder={ type ? placeholder || "Type here..." : "" } 
                        { ...rest } 
                    />
                    {passwordVisible && 
                        <Button 
                            type = "button"
                            className = "material-icons"
                            onClick = {()=> setVisible(!visible)}
                        >
                            { visible ? "visibility_off" : "visibility" }
                        </Button>
                    }
                </>
                :
                <Select { ...rest }>
                    {activeOption && <Option>{ activeOption || "Select Option" }</Option>}
                    {option.map((item, index) => (
                        <Option key={ index } value={ index !== -1 ? index : item}>{ item?.text || item}</Option>
                    ))}
                </Select>
            }</> 
            }
       </Box>
       {alert && <p className="text-danger">{alert}</p>}
       </>
    )
}