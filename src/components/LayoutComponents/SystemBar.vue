<template>
	<v-system-bar
		style="-webkit-app-region: drag"
		window
		height="30"
		class="white--text"
		color="teal darken-2"
		app
	>
		<v-spacer></v-spacer>

		<div id="buttons" style="-webkit-app-region: no-drag">
			<v-icon @click="minimize()" id="minimize" class="pa-2"
				>mdi-window-minimize</v-icon
			>
			<v-icon v-if="resizeWindow" @click="maximize()" id="maximize" class="pa-2"
				>mdi-window-restore</v-icon
			>
			<v-icon
				v-else-if="!resizeWindow"
				@click="maximize()"
				id="maximize"
				class="pa-2"
				>mdi-window-maximize</v-icon
			>
			<v-icon @click="close()" id="close" class="pa-2">mdi-window-close</v-icon>
		</div>
	</v-system-bar>
</template>

<script>
	export default {
		props: {
			name: {
				type: String,
				require: true,
			},
		},
		data() {
			return {
				resizeWindow: true,
			};
		},
		methods: {},
	};
</script>

<style scoped>
	#buttons {
		margin-right: -13px;
		transition: all ease-in-out 0.2s;
		cursor: default;
	}
	/* #buttons #maximize,#buttons #minimize,#buttons #close{
    color: white;
    cursor: pointer;
  } */
	#maximize,
	#minimize,
	#close {
		text-align: center;
		color: white;
		transition: all ease-in-out 0.2s;
	}

	#buttons #maximize:hover,
	#buttons #minimize:hover {
		background-color: white;
		color: black;
		cursor: pointer;
	}
	#buttons #close:hover {
		background-color: #ff0000;
		cursor: pointer;
	}
</style>
