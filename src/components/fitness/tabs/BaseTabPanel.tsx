import { ReactNode } from "react";

export default function BaseTabPanel(props: { index: number, value: number, children?: ReactNode }) {
    return(
        <div role="tabpanel" 
             id={`tabpanel-${props.index}`}
             hidden={props.value !== props.index}>
            {props.children}
        </div>
    );
}