<template>
	<v-container class="my-5">
		<v-row>
			<v-col md="12">
				<v-data-table
					:headers="headers"
					:items="users"
					sort-by="text"
					class="elevation-1 strip-table"
				>
					<template v-slot:top>
						<v-toolbar
							flat
							elevation-1
							color="teal darken-1"
							dark
							class="lighten-2"
						>
							<v-toolbar-title
								><v-icon>mdi-account-group</v-icon> USERS</v-toolbar-title
							>
							<v-divider class="mx-5" inset vertical></v-divider>
							<v-spacer></v-spacer>

							<v-dialog v-model="dialog" max-width="500px">
								<template v-slot:activator="{ on }">
									<v-btn class="mb-2 teal--text" color="white" v-on="on">
										<i class="fa fa-plus" aria-hidden="true"></i>
										<span>new user</span>
									</v-btn>
								</template>

								<v-card>
									<v-card-title>
										<span class="headline">{{ formTitle }}</span>
									</v-card-title>

									<!-- Form Textfields -->
									<v-card-text>
										<v-container>
											<v-row dense>
												<v-col cols="12">
													<v-text-field
														v-model="editedItem.name"
														outlined
														dense
														label=" Name"
														@input="$v.editedItem.name.$touch()"
														@blur="$v.editedItem.name.$touch()"
														:error-messages="nameErrors"
													/>
												</v-col>
												<v-col cols="12">
													<v-text-field
														v-model="editedItem.username"
														outlined
														dense
														label=" company name"
														@input="$v.editedItem.username.$touch()"
														@blur="$v.editedItem.username.$touch()"
														:error-messages="usernameErrors"
													/>
												</v-col>

												<v-col cols="12">
													<v-text-field
														v-model="editedItem.phone"
														type="number"
														outlined
														dense
														label="Phone"
														@input="$v.editedItem.phone.$touch()"
														@blur="$v.editedItem.phone.$touch()"
														:error-messages="phoneErrors"
													/>
												</v-col>

												<v-col class="d-flex" cols="12" sm="6">
													<v-select
														:items="roles"
														label="Select role"
														dense
														outlined
														v-model="editedItem.role"
													></v-select>
												</v-col>
											</v-row>
										</v-container>
									</v-card-text>

									<v-card-actions>
										<v-spacer></v-spacer>
										<v-btn
											color="red darken-1"
											class="white--text"
											@click="close"
											>Cancel</v-btn
										>
										<v-btn
											color="teal darken-1"
											class="white--text"
											:disabled="$v.$invalid"
											@click="save"
											>Save</v-btn
										>
									</v-card-actions>
								</v-card>
							</v-dialog>
							<v-dialog v-model="dialogDelete" max-width="500px">
								<v-card>
									<v-card-title class="headline"
										>Are you sure you want to delete this <br />
										User?</v-card-title
									>
									<v-card-actions>
										<v-spacer></v-spacer>
										<v-btn color="red darken-1 white--text" @click="closeDelete"
											>No</v-btn
										>
										<v-btn
											color="teal darken-2 white--text"
											@click="deleteItemConfirm"
											>Yes</v-btn
										>
										<v-spacer></v-spacer>
									</v-card-actions>
								</v-card>
							</v-dialog>
						</v-toolbar>
					</template>
					<template v-slot:[`item.actions`]="{ item }">
						<v-icon
							small
							color="teal darken-2"
							class="mr-2"
							@click="editItem(item)"
						>
							mdi-pencil
						</v-icon>
						<v-icon small color="red darken-2" @click="deleteItem(item)">
							mdi-delete
						</v-icon>
					</template>
					<template v-slot:no-data>
						<v-btn color="teal darken-2" dark @click="users">Reset</v-btn>
					</template>
				</v-data-table>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
	// import { ipcRenderer } from 'electron'
	import { required, minLength, numeric } from 'vuelidate/lib/validators';

	export default {
		data: () => ({
			dialog: false,
			dialogDelete: false,
			valid: false,
			headers: [
				{
					text: 'Name',
					align: 'left',
					sortable: true,
					value: 'name',
				},
				{ text: 'Username', value: 'username' },
				{ text: 'Role', value: 'role' },

				{ text: 'Actions', align: 'center', value: 'actions', sortable: false },
			],
			roles: ['admin', 'manager', 'user'],
			users: [
				{
					name: 'isaac agyei duku',
					username: 'aiduku',
					phone: '0209480433',
					role: 'admin',
				},
			],
			editedIndex: -1,
			editedItem: {
				name: '',
				username: '',
				phone: '',
				role: '',
			},
			defaultItem: {
				name: '',
				username: '',
				phone: '',
				role: '',
			},
		}),
		validations: {
			editedItem: {
				name: {
					required,

					minLength: minLength(5),
				},
				phone: {
					required,
					numeric,
					tenDigitPhonNumber(value) {
						return value.trim().length === 10;
					},
					async uniquePhone(value) {
						if (value == '') return true;

						const users = this.users;
						const phone_no_AlreadyExist = users.find(
							(user) => user.phone.toLowerCase() === value.toLowerCase()
						);
						if (phone_no_AlreadyExist) {
							return false;
						}
						return true;
					},
				},
				username: {
					required,
					async uniqueUsername(value) {
						if (value == '') return true;

						const users = this.users;
						const username_AlreadyExist = users.find(
							(user) => user.username.toLowerCase() === value.toLowerCase()
						);
						if (username_AlreadyExist) {
							return false;
						}
						return true;
					},
				},
				role: {
					required,
				},
			},
		},
		computed: {
			formTitle() {
				return this.editedIndex === -1 ? 'New User' : 'Edit User';
			},
			nameErrors() {
				const errors = [];
				if (!this.$v.editedItem.name.$dirty) return errors;
				!this.$v.editedItem.name.minLength &&
					errors.push("User's  name must be atleast 5 characters*");
				!this.$v.editedItem.name.required &&
					errors.push('User name is required*');

				return errors;
			},
			usernameErrors() {
				const errors = [];
				if (!this.$v.editedItem.username.$dirty) return errors;
				!this.$v.editedItem.username.uniquePhone &&
					errors.push('Username already exist*');
				!this.$v.editedItem.username.required &&
					errors.push('Username is required*');

				return errors;
			},
			phoneErrors() {
				const errors = [];
				if (!this.$v.editedItem.phone.$dirty) return errors;
				!this.$v.editedItem.phone.uniquePhone &&
					errors.push('Phone number already exist*');
				!this.$v.editedItem.phone.required &&
					errors.push('phone number is required*');
				!this.$v.editedItem.phone.numeric &&
					errors.push('phone number is INVALID, must only be digits (0 - 9) *');
				!this.$v.editedItem.phone.tenDigitPhonNumber &&
					errors.push('phone number must be exactly 10 digits *');

				return errors;
			},

			roleErrors() {
				const errors = [];
				!this.$v.editedItem.address.required &&
					errors.push('role is required*');
				return errors;
			},
		},

		watch: {
			dialog(val) {
				val || this.close();
			},
			dialogDelete(val) {
				val || this.closeDelete();
			},
		},

		created() {
			this.loadUsers();
		},

		methods: {
			loadUsers() {
				return this.users;
			},
			editItem(item) {
				this.editedIndex = this.users.indexOf(item);
				this.editedItem = Object.assign({}, item);
				this.dialog = true;
			},
			deleteItem(item) {
				this.editedIndex = this.users.indexOf(item);
				this.editedItem = Object.assign({}, item);
				this.dialogDelete = true;
			},

			deleteItemConfirm() {
				this.users.splice(this.editedIndex, 1);
				// ipcRenderer.send('users:delete', this.editedItem.id);
				this.closeDelete();
			},

			close() {
				this.dialog = false;
				this.$nextTick(() => {
					this.editedItem = Object.assign({}, this.defaultItem);
					this.editedIndex = -1;
				});
			},

			closeDelete() {
				this.dialogDelete = false;
				this.$nextTick(() => {
					this.editedItem = Object.assign({}, this.defaultItem);
					this.editedIndex = -1;
				});
			},

			async save() {
				if (this.editedIndex > -1) {
					Object.assign(this.users[this.editedIndex], this.editedItem);
				} else {
					this.$v.$touch();
					if (!this.$v.$invalid) {
						// ipcRenderer.send('users:add', this.editedItem);
						this.loadUsers();
					}
				}
				this.close();
			},
			clearForm() {
				this.$v.reset;
				this.editedItem.name = '';
				this.editedItem.username = '';
				this.editedItem.role = '';
				this.editedItem.phone = '';
			},
		},
	};
</script>

<style scoped>
	.v-data-table table tr:nth-of-type(2n) {
		background: lightslategrey;
	}
</style>
