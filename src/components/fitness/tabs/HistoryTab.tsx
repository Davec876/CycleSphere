import BaseTabPanel from "./BaseTabPanel";

export default function HistoryTab(props: { index: number, value: number }) {
    return(
        <BaseTabPanel index={props.index} value={props.value}>
            <h1>This is the history tab!</h1>
        </BaseTabPanel>
    );
}