import BaseTabPanel from "./BaseTabPanel";

export default function StatsTab(props: { index: number, value: number }) {
    return(
        <BaseTabPanel index={props.index} value={props.value}>
            <h1>This is the stats tab!</h1>
        </BaseTabPanel>
    );
}