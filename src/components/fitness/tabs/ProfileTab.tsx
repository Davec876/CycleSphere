import BaseTabPanel from "./BaseTabPanel";

export default function ProfileTab(props: { index: number, value: number }) {
    return(
        <BaseTabPanel index={props.index} value={props.value}>
            <h1>This is the profile tab!</h1>
        </BaseTabPanel>
    );
}