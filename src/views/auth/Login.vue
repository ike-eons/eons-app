<template>
	<v-app id="container" class="login-container">
		<div class="login" id="login">
			<v-row class="text-center">
				<v-col cols="6" offset="3">
					<v-card shaped class="pb-5">
						<v-row class="text-center pb-5">
							<v-col cols="12" class="py-5">
								<h2>LOGIN</h2>
							</v-col>
							<v-col cols="10" offset="1">
								<v-text-field
									outlined
									dense
									label="Username"
									prepend-icon="mdi-account-circle"
									color="black darken-4"
									v-model="user.username"
								/>
							</v-col>
							<v-col cols="10" offset="1">
								<v-text-field
									outlined
									dense
									:type="showPassword ? 'text' : 'password'"
									label="Enter your password"
									prepend-icon="mdi-lock"
									:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
									@click:append="showPassword = !showPassword"
									v-model="user.password"
									color="black darken-4"
								/>
							</v-col>
							<v-col cols="10" offset="1">
								<v-btn block x-large tile color="teal" dark @click="login()"
									>LOGIN</v-btn
								>
							</v-col>
						</v-row>
					</v-card>
				</v-col>
			</v-row>
		</div>
	</v-app>
	<!-- </v-container> -->
</template>

<script>
	export default {
		data() {
			return {
				showPassword: false,
				apiRequest: false,
				user: {
					username: '',
					password: '',
				},
				feedback: '',
				errors: [],
			};
		},
		methods: {
			login() {
				if (this.user.username === 'admin' && this.user.password === 'admin') {
					console.log('login');
					this.$router.push('/layout');
				} else {
					console.log('credentials do not match');
				}
			},
		},
	};
</script>

<style scoped>
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	#login {
		-webkit-app-region: no-drag;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	#container {
		width: 100%;
		height: 100%;
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		background: linear-gradient(
			110.7deg,
			rgb(9, 154, 151) 6.3%,
			rgb(21, 205, 168) 90.6%
		);
		-webkit-app-region: drag;
		background-image: linear-gradient(
				110.7deg,
				hsla(179, 89%, 32%, 0.95) 6.3%,
				rgba(21, 205, 168, 0.99) 90.6%
			),
			url('../../assets/sales.jpg');
		background-size: contain;
	}
</style>
