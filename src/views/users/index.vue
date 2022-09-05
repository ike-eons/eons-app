<template>
	<div>
		<v-card fluid style="width: 80%">
			<v-card-title class="justify-center">
				<h4>Your Account Settings</h4>
			</v-card-title>
			<v-card-text class="justify-center mx-19">
				<v-container fluid style="width: 60%">
					<div>
						<v-text-field
							label="Name"
							outlined
							dense
							v-model="user.name"
						></v-text-field>
					</div>
					<div>
						<v-text-field
							label="Username"
							v-model="user.username"
							outlined
							dense
						/>
						<v-text-field label="Email" v-model="user.email" outlined dense />
					</div>
					<v-btn color="success">Save Settings</v-btn>
					<v-divider class="mt-10 mb-5" />
					<div class="mt-10 mb-5">
						<h2>Password Change</h2>
					</div>
					<div>
						<v-text-field label="Current password" outlined dense />
					</div>
					<div>
						<v-text-field label="New password" outlined dense />
						<v-text-field label="Confirm new password" outlined dense />
					</div>
					<div>
						<v-btn color="success">Save Password</v-btn>
					</div>
				</v-container>
			</v-card-text>
		</v-card>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				user: {
					name: 'isaac agyei duku',
					email: 'i.agyeiduku@gmail.com',
					username: 'ai.duku',
				},
			};
		},
	};
</script>

<style></style>
