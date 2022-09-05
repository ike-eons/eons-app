<template>
	<v-app-bar app clipped-right flat height="52" color="teal darken-1">
		<v-app-bar-nav-icon
			class="white--text"
			@click="openDrawer()"
		></v-app-bar-nav-icon>
		<v-spacer></v-spacer>

		<v-btn small color="white" text rounded @click="add_invoice()">
			<v-icon>mdi-cart</v-icon>
			<span>Invoice</span>
		</v-btn>
		<v-btn small color="white" text rounded>
			<v-icon>mdi-clipboard-text-outline</v-icon>
			<span>Inventory</span>
		</v-btn>
		<v-btn small color="white" text rounded>
			<v-icon>mdi-handshake</v-icon>
			<span>Transactions</span>
		</v-btn>
		<v-btn small color="white" text rounded @click="add_stock()">
			<v-icon>mdi-currency-usd</v-icon>
			<span>Stock</span>
		</v-btn>

		<v-spacer />

		<v-btn small color="white" text rounded @click="logout">
			<span>Logout</span>
			<v-icon small right>mdi-logout</v-icon>
		</v-btn>
		<v-btn small color="white" text rounded @click="userInfo">
			<span>{{ user.username }}</span>
			<v-icon small right>mdi-account-circle</v-icon>
		</v-btn>
	</v-app-bar>
</template>

<script>
	export default {
		props: {
			openNav: Boolean,
		},
		data() {
			return {
				user: {
					username: 'eons',
				},
			};
		},
		methods: {
			openDrawer() {
				this.drawer = !this.drawer;

				this.$emit('openDrawer', this.drawer);
			},
			logout() {
				this.$router.replace({ name: 'Logout' });
			},
			add_invoice() {
				this.$router.push('/invoices/new');
			},
			add_stock() {
				this.$router.push('/stocks/new');
			},
			userInfo() {
				this.$router.push('/user');
			},
		},
	};
</script>

<style></style>
