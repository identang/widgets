import React, {useState,useEffect} from "react";
import axios from "axios";

const Convert= ({language, text}) => {
    const [translated,setTranslated] = useState("");
    const [debouncedText,setDebouncedText] = useState("text");
    
    useEffect(()=>{
        const timerId = setTimeout(()=>{
            setDebouncedText(text);
        },500);
        
        return ()=>{ //will exexcute if the state is changed beofore 500ms 
            clearTimeout(timerId)
        };
    },[text]);
    useEffect(()=>{
        const doTranslation = async () =>{
            const { data } = await axios.post("https://translation.googleapis.com/language/translate/v2",{},{
                params:{
                    q: debouncedText,
                    target: language.value,
                    key:"AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM"
                }
            });
            setTranslated(data.data.translations[0].translatedText)
            //the first "data" refers to the data destructuring. second referes to the directory of the data from axios
        };
        doTranslation(); // remember to call the function after all
    },[language,debouncedText]);

    return (
    <div>
        <h1 className="ui header">{translated}</h1>
    </div>
    );

};

export default Convert;