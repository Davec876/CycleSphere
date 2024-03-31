<!--- The following README.md sample file was adapted from https://gist.github.com/PurpleBooth/109311bb0361f32d87a2#file-readme-template-md by Gabriella Mosquera for academic use ---> 


# CSCI 4177 - Project: CycleSphere

CycleSphere is a social media platform for cyclists in Halifax built as part of an academic project for CSCI 4177 (Advanced Web Services) at Dalhousie University. It is an effortless way for cycling enthusiasts to find new cycling trails or routes to ride along. With this app, users can find cycling trails, be it established trails in the city or community-made custom routes. Users can also see what other members of the community have to say about these trails and what their experiences on them were like through our social component, where people can drop comments under trails, “like” trails, share pictures they took, and more. Additionally, as our app learns more about a particular user, it can recommend new routes or trails this user may like.

* *Date Created*: 19 Jan 2024
* *Project URL*: <https://4177-group-project.vercel.app/>
* *Git URL*: <https://git.cs.dal.ca/guk/4177-group-project/>



## Authors

TEAM 18
* [Saahir Monowar](Saahir.Monowar@dal.ca) - *(Team member)*
* [Erxiao Tang](Erxiao.Tang@dal.ca) - *(Team member)*
* [Dave Chuck](dchuck@dal.ca) - *(Team Member)*
* [Kevin Orenday](kevin.orenday@dal.ca) - *(Team Member)*
* [Maximo Guk](maximo@dal.ca) - *(Team Member)*
* [Ahmed Galal](a.galal@dal.ca) - *(Team Member)*



## Getting Started

See deployment for notes on how to deploy the project on a live system.

### Prerequisites

To have a local copy of this project up and running on your local machine, you will first need to install the following software

* [Node.js](https://nodejs.org/en)

You will also need the following strings

* The connection string to a [MongoDB](https://www.mongodb.com/) instance
* An activated [google maps API key](https://developers.google.com/maps/get-started) (requires credit card information)


### Installing 

Launch a command line terminal at the root of the project `/`

Install node packages

```bash
npm install
```

Generate an openssl random string

```bash
openssl rand -base64 32
```

Save the generated string. This will be needed shortly

Create a new file called `.env.local`

Add this line into the newly created file, but replace &lt;openssl-str&gt; with the generated string from earlier

```
AUTH_SECRET=<openssl-str>
```

Obtain our `PROD_JWT_SECRET` in order for cross-origin uploads to work, and replace &lt;prod-jwt-secret&gt; with it

```
PROD_JWT_SECRET=<prod-jwt-secret>
```

Add this line into the file, but replace &lt;mongo-url&gt; with your MongoDB connection string

```
MONGODB_URI=<mongo-url>
```

Add this line into the file, but replace &lt;gmaps-api-key&gt; with your Google Maps API key

```
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=<gmaps-api-key>
```

Then, from the terminal, run the development server

```bash
npm run dev
```

And finally, open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



## Deployment

Visit [Next.js' deployment page](https://nextjs.org/docs/pages/building-your-application/deploying) for deployment instructions



## Built With

* [Next.js](https://nextjs.org/) - The web framework used
* [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) - Used to bootstrap the project
* [`next font`](https://nextjs.org/docs/basic-features/font-optimization) - Used to optimize and load font
* [Material UI](https://mui.com/) - Frontend design library

## Sources Used

### DeckGlOverlay.tsx

*Lines 1 - 33*

```
// Adapted from https://github.com/visgl/react-google-maps/blob/main/examples/deckgl-overlay/src/deckgl-overlay.ts
import { useMap } from '@vis.gl/react-google-maps';
import { useEffect, useMemo } from 'react';

import { GoogleMapsOverlay } from '@deck.gl/google-maps/typed';

import type { LayersList } from '@deck.gl/core/typed';

export type DeckglOverlayProps = { layers?: LayersList };

/**
 * A very simple implementation of a component that renders a list of deck.gl layers
 * via the GoogleMapsOverlay into the <Map> component containing it.
 */
export const DeckGlOverlay = ({ layers }: DeckglOverlayProps) => {
	// the GoogleMapsOverlay can persist throughout the lifetime of the DeckGlOverlay
	const deck = useMemo(() => new GoogleMapsOverlay({ interleaved: true }), []);

	// add the overlay to the map once the map is available
	const map = useMap();
	useEffect(() => {
		deck.setMap(map);
	}, [deck, map]);

	// whenever the rendered data changes, the layers will be updated
	useEffect(() => {
		deck.setProps({ layers });
	}, [deck, layers]);

	// no dom rendered by this component
	return null;
};

```

The code above was created by adapting the code in [DeckGl-Example](https://github.com/visgl/react-google-maps/blob/main/examples/deckgl-overlay/src/deckgl-overlay.ts)

- The code in [DeckGl-Example](https://github.com/visgl/react-google-maps/blob/main/examples/deckgl-overlay/src/deckgl-overlay.ts) was implemented by copying the DeckGl example code
- [DeckGl-Example](https://github.com/visgl/react-google-maps/blob/main/examples/deckgl-overlay/src/deckgl-overlay.ts)'s code was used because we're incorportating vis.gl google maps with deck.gl, and therefore need this sample code boilerplate to get started

### AutoCompleteCustom.tsx

*Lines 1 - 103*

```
// Adapted from https://github.com/visgl/react-google-maps/blob/main/examples/autocomplete/src/autocomplete-custom.tsx
'use client';

import { useEffect, useState, useCallback, type ChangeEvent } from 'react';
import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

interface Props {
	onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
}

// This is a custom built autocomplete component using the "Autocomplete Service" for predictions
// and the "Places Service" for place details
export const AutocompleteCustom = ({ onPlaceSelect }: Props) => {
	const map = useMap();
	const places = useMapsLibrary('places');

	// https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompleteSessionToken
	const [sessionToken, setSessionToken] =
		useState<google.maps.places.AutocompleteSessionToken>();

	// https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service
	const [autocompleteService, setAutocompleteService] =
		useState<google.maps.places.AutocompleteService | null>(null);

	// https://developers.google.com/maps/documentation/javascript/reference/places-service
	const [placesService, setPlacesService] =
		useState<google.maps.places.PlacesService | null>(null);

	const [predictionResults, setPredictionResults] = useState<
		Array<google.maps.places.AutocompletePrediction>
	>([]);

	const [inputValue, setInputValue] = useState<string>('');

	useEffect(() => {
		if (!places || !map) return;

		setAutocompleteService(new places.AutocompleteService());
		setPlacesService(new places.PlacesService(map));
		setSessionToken(new places.AutocompleteSessionToken());

		return () => setAutocompleteService(null);
	}, [map, places]);

	const fetchPredictions = useCallback(
		async (inputValue: string) => {
			if (!autocompleteService || !inputValue) {
				setPredictionResults([]);
				return;
			}

			const request = { input: inputValue, sessionToken };
			const response = await autocompleteService.getPlacePredictions(request);

			setPredictionResults(response.predictions);
		},
		[autocompleteService, sessionToken]
	);

	const onInputChange = useCallback(
		(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			const value = (event.target as HTMLInputElement)?.value;

			setInputValue(value);
			fetchPredictions(value);
		},
		[fetchPredictions]
	);

	const handleSuggestionClick = useCallback(
		(placeId: string) => {
			if (!places) return;

			const detailRequestOptions = {
				placeId,
				fields: ['geometry', 'name', 'formatted_address'],
				sessionToken,
			};

			const detailsRequestCallback = (
				placeDetails: google.maps.places.PlaceResult | null
			) => {
				onPlaceSelect(placeDetails);
				setPredictionResults([]);
				setInputValue(placeDetails?.formatted_address ?? '');
				setSessionToken(new places.AutocompleteSessionToken());
			};

			placesService?.getDetails(detailRequestOptions, detailsRequestCallback);
		},
		[onPlaceSelect, places, placesService, sessionToken]
	);
```

The code above was created by adapting the code in [VisGl-Example](https://github.com/visgl/react-google-maps/blob/main/examples/autocomplete/src/autocomplete-custom.tsx)

- The code in [VisGl-Example](https://github.com/visgl/react-google-maps/blob/main/examples/autocomplete/src/autocomplete-custom.tsx) was implemented by copying the VisGl example code
- [VisGl-Example](https://github.com/visgl/react-google-maps/blob/main/examples/autocomplete/src/autocomplete-custom.tsx)'s code was used because we're incorportating vis.gl google maps, and therefore need this sample code boilerplate to get started
- [VisGl-Example](https://github.com/visgl/react-google-maps/blob/main/examples/autocomplete/src/autocomplete-custom.tsx)'s code was modified by adapting it to our use case, by adapting it for routes.

### MapHandler.tsx

*Lines 1 - 26*

```
// Sourced from https://github.com/visgl/react-google-maps/blob/main/examples/autocomplete/src/map-handler.tsx
'use client';

import { useMap } from '@vis.gl/react-google-maps';
import { memo, useEffect } from 'react';

interface Props {
	place: google.maps.places.PlaceResult | null;
}

const MapHandler = ({ place }: Props) => {
	const map = useMap();

	useEffect(() => {
		if (!map || !place) return;

		if (place.geometry?.viewport) {
			map.fitBounds(place.geometry?.viewport);
		}
	}, [map, place]);

	return null;
};

export default memo(MapHandler);

```

The code above was created by adapting the code in [VisGl-Example](https://github.com/visgl/react-google-maps/blob/main/examples/autocomplete/src/autocomplete-custom.tsx)

- The code in [VisGl-Example](https://github.com/visgl/react-google-maps/blob/main/examples/autocomplete/src/autocomplete-custom.tsx) was implemented by copying the VisGl example code
- [VisGl-Example](https://github.com/visgl/react-google-maps/blob/main/examples/autocomplete/src/autocomplete-custom.tsx)'s code was used because we're incorportating vis.gl google maps, and therefore need this sample code boilerplate to get started
- [VisGl-Example](https://github.com/visgl/react-google-maps/blob/main/examples/autocomplete/src/autocomplete-custom.tsx)'s code was modified by adapting it to our use case, by adapting it for routes.


<!-- START OF KEVIN'S SOURCES -->

### FitnessCard.tsx

*Lines 36 - 62*

```
// https://mui.com/material-ui/react-tabs/
<Box>
	<Tabs value={tab} onChange={changeTab}>
		<Tab label="Profile" id="tab-header-0" aria-controls="tabpanel-0" />
		<Tab
			label="Stats"
			id="tab-header-1"
			aria-controls="tabpanel-1"
			disabled={!tracking}
		/>
		<Tab
			label="History"
			id="tab-header-2"
			aria-controls="tabpanel-2"
			disabled={!tracking}
		/>
	</Tabs>
</Box>
<CardContent>
	<ProfileTab
		profile={props.profile}
		value={tab}
		index={0}
		handler={setTracking}
	/>
	<StatsTab profile={props.profile} value={tab} index={1} />
	<HistoryTab profile={props.profile} value={tab} index={2} />
</CardContent>
```

The code above was created by adapting the code in [React Tabs Example](https://mui.com/material-ui/react-tabs/).

- The code in [React Tabs Example](https://mui.com/material-ui/react-tabs/) was implemented by copying the Introduction example code.
- [React Tabs Example](https://mui.com/material-ui/react-tabs/)'s code was used because we're incorportating a card-based panels with navigation tabs according to the design from Assignment 2, and therefore need this sample code boilerplate to get started.

### StatsTab.tsx

*Lines 26 - 47*

```
// https://mui.com/x/react-charts/bars/
<BarChart
	height={350}
	yAxis={[
		{
			label: 'Distance Cycled (km)',
		},
	]}
	xAxis={[
		{
			label: 'Day of the Week',
			dataKey: 'day',
			scaleType: 'band',
		},
	]}
	dataset={sample_data}
	series={[
		{
			dataKey: 'distance',
			valueFormatter: chartOneFormatter,
		},
	]}
></BarChart>
```

The code above was created by adapting the code in [React Bar Charts (Tick placement example)](https://mui.com/x/react-charts/bars/).

- The code in [React Bar Charts (Tick placement example)](https://mui.com/x/react-charts/bars/) was implemented by copying the Tick placement example code.
- [React Bar Charts (Tick placement example)](https://mui.com/x/react-charts/bars/)'s code was used because we're incorportating a chart, which utilizes Material UI X's chart API, that will display user's data on the panel, and therefore need this sample code boilerplate to get started.

### HistoryTab.tsx

*Lines 38-57*

```
// https://mui.com/material-ui/react-autocomplete/
<Autocomplete
	id="search-box"
	freeSolo
	options={routes?.map((list: { title: string }) => list.title)}
	renderInput={(params) => (
		<TextField
			{...params}
			label="Search history"
			InputProps={{ ...params.InputProps, type: 'search' }}
		/>
	)}
	onInputChange={(event, value) => {
		event.preventDefault();
		const temp = routes.filter((route: { title: string }) => {
			const regex = new RegExp(`.*${value}.*`, 'ig');
			return route?.title?.match(regex)?.length;
		});
		setList(temp);
	}}
/>
```

The code above was created by adapting the code in [React Autocomplete Component Example](https://mui.com/material-ui/react-autocomplete/).

- The code in [React Autocomplete Component Example](https://mui.com/material-ui/react-autocomplete/) was implemented by copying the Free solo (search input) example code.
- [React Autocomplete Component Example](https://mui.com/material-ui/react-autocomplete/)'s code was used because we're incorportating a search box that has suggestions based on what the input is and what the available items are, and therefore need this sample code boilerplate to get started.

<!-- END OF KEVIN'S SOURCES -->



<!-- Uncomment this section (parts of it or the entire thing) if we need to cite anything

## Artificial Intelligence Tools Used
If in completing your lab / assignment / project you used any Artificial Intelligence Tools or Plugins, then provide a list of the tools or plugins used, the prompt used, the code generated by the AI, where the code was implemented, how it was implemented, why it was implemented, and how it was modified. See the sections below for more details.

* [Name of Tool](http://www.dropwizard.io/1.0.2/docs/) - The AI Tool used
* [Name of Tool](http://www.dropwizard.io/1.0.2/docs/) - The AI Plugin used
* [Name of Tool](http://www.dropwizard.io/1.0.2/docs/) - The AI Tool used


### Prompt Used on *NAME OF AI TOOL*

```
Copy and paste the prompt used 

```

The code prompt above was used [NAME](link) to generate the code shown below: 

```
Copy and paste the entirety of the code generated by the AI Tool listed above.

```

#### File Name
*Lines ## - ##*

```
Copy and paste your code on the lines mentioned

```

- \<!---How---\> The code in [NAME](link) was implemented by...
- \<!---Why---\> [NAME](link)'s Code was used because...
- \<!---How---\> [NAME](link)'s Code was modified by...


### Prompt Used on *NAME OF AI TOOL*

```
Copy and paste the prompt used 

```

The code prompt above was used [NAME](link) to generate the code shown below: 

```
Copy and paste the entirety of the code generated by the AI Tool listed above.

```

#### File Name
*Lines ## - ##*

```
Copy and paste your code on the lines mentioned

```

- \<!---How---\> The code in [NAME](link) was implemented by...
- \<!---Why---\> [NAME](link)'s Code was used because...
- \<!---How---\> [NAME](link)'s Code was modified by...


*Repeat as needed*
-->