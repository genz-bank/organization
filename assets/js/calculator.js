(function() {
	const { Component } = owl;
	const { xml } = owl.tags;
	const { whenReady } = owl.utils;

	const { useState } = owl.hooks;

	// -------------------------------------------------------------------------
	// NetworkTable
	// -------------------------------------------------------------------------
	const ResourceTable_TEMPLATE =  xml /* xml */`
	<section 
		class="container-fluid">
		<h2> Resources and Hardwares </h2>
		<table class="table table-striped table-hover">
			<thead>
			<tr>
				<th scope="col">CPU</th>
				<th scope="col">RAM</th>
				<th scope="col">HDD</th>
				<th scope="col">SSD</th>
				<th scope="col">Cost</th>
				<th scope="col">Reference</th>
				<th scope="col"></th>
			</tr>
			</thead>
			<tbody>
			<t t-foreach="props.resources" t-as="resource" t-key="resource.id">
			<tr t-if="resource.id">
				<td><t t-esc="resource.CPU"/></td>
				<td><t t-esc="resource.RAM"/></td>
				<td><t t-esc="resource.HDD"/></td>
				<td><t t-esc="resource.SSD"/></td>
				<td><t t-esc="resource.cost"/></td>
				<td><t t-esc="resource.name"/></td>
				<th scope="row"><a t-att-href="resource.url">More info</a></th>
			</tr>
			</t>
			</tbody>
		</table>
	</section>`;

	class ResourceTable extends Component {
		static template = ResourceTable_TEMPLATE;
	}
	
	// -------------------------------------------------------------------------
	// NetworkTable
	// -------------------------------------------------------------------------
	const NetworkTableRow_TEMPLATE = xml /* xml */`
			<tr>
				<th scope="row"><img width="32px" height="32px" t-att-src="props.network.icon" /></th>
				<td><a t-att-href="props.network.url"><t t-esc="props.network.title"/></a></td>
				<td><t t-esc="props.network.tokenPrice"/></td>
				<td><t t-esc="props.network.count"/></td>
				<td><t t-esc="props.network.tokenPrice * props.network.count"/></td>
				<td>
					<button type="button"
						class="btn btn-link"
						t-on-click="deleteNetwork"><i class="fa fa-trash"></i></button>
				</td>
			</tr>
	`;

	class NetworkTableRow extends Component {
		static template = NetworkTableRow_TEMPLATE;

		deleteNetwork() {
			alert(this.props.network.title)
		}
	}

	// -------------------------------------------------------------------------
	// NetworkTable
	// -------------------------------------------------------------------------
	const NetworkTable_TEMPLATE = xml /* xml */`
	<section 
		class="container-fluid">
		<table class="table table-striped table-hover">
			<thead>
			<tr>
				<th scope="col"></th>
				<th scope="col">Title</th>
				<th scope="col">Cost/Month (USDT)</th>
				<th scope="col">required count</th>
				<th scope="col">partial sum</th>
				<th scope="col">Actions</th>
			</tr>
			</thead>
			<tbody>
			<t t-foreach="props.networks" t-as="network" t-key="network.id">
			<NetworkTableRow network="network" t-if="network.id" />
			</t>
			</tbody>
		</table>
	</section>`;

	class NetworkTable extends Component {
		static template = NetworkTable_TEMPLATE;
		static components = { NetworkTableRow };

		deleteNetwork(network) {
			alert(network.title)
		}
	}


	// -------------------------------------------------------------------------
	// RolesTable
	// -------------------------------------------------------------------------
	const RolesTable_TEMPLATE = xml /* xml */`
	<section 
		class="container-fluid">
		<table class="table table-striped table-hover">
			<thead>
			<tr>
				<th scope="col">Abbreviation</th>
				<th scope="col">Title</th>
				<th scope="col">Cost/Month (USDT)</th>
				<th scope="col">required count</th>
				<th scope="col">partial sum</th>
			</tr>
			</thead>
			<tbody>
			<t t-foreach="props.roles" t-as="role" t-key="role.id">
			<tr t-if="role.id">
				<th scope="row"><a t-att-href="role.url"><t t-esc="role.abbreviation"/></a></th>
				<td><a t-att-href="role.url"><t t-esc="role.title"/></a></td>
				<td><t t-esc="role.cost"/></td>
				<td><t t-esc="role.count"/></td>
				<td><t t-esc="role.cost * role.count"/></td>
			</tr>
			</t>
			</tbody>
		</table>
	</section>`;

	class RolesTable extends Component {

		static template = RolesTable_TEMPLATE;
	}



	// -------------------------------------------------------------------------
	// InitCost
	// -------------------------------------------------------------------------
	const InitCost_TEMPLATE = xml /* xml */`
	<section 
		class="container-fluid">
		<h2>Setup Cost</h2>
		<div>$$ Cost_{Setup} = 150*n + \sum_{i=1}^{n} [(s_i + fee_{transaction}^i) * token_{price}^i ] $$</div>
		<p> Where: </p>

		<table>
			<tr><td>150</td><td> It is the cost of installation, which is Usually paid to developers.</td></tr>
			<tr><td>$$ n $$</td><td> Number of nodes</td></tr>
			<tr><td>$ s_i $</td><td> The starting stake value</td></tr>
			<tr><td>$ fee_{transaction}^i $</td><td> The network fee for each transaction</td></tr>
			<tr><td>$ token_{price}^i $</td><td> The price of the token</td></tr>
		</table>
		
		<div class="alert alert-primary row" role="alert">
			<div class="col-12 text-center">$$ Cost_{Setup} $$ </div>
			<spam class="col-12 text-center" t-esc="state.costSetup"></spam>
		</div>
	</section>`;

	class InitCost extends Component {
		static template = InitCost_TEMPLATE;
		state = useState({
			costSetup: 0
		});

		constructor() {
			super()
			var costSetup = 0;
			this.env.networksDb.forEach(network => {
				if(network.id) {
					// Constant cost
					costSetup += 150 + (network.nodeStartValue + network.networkFee) * network.tokenPrice;
				}
			});
			this.state.costSetup = costSetup;
		}
	}

	// -------------------------------------------------------------------------
	// MaintainCost
	// -------------------------------------------------------------------------
	const MaintainCost_TEMPLATE = xml /* xml */`
	<section 
		class="container-fluid">
		<h2>Setup Cost</h2>
		<div>$$ Cost_{Maintain} = \SUM_{i=1}^{n} C_{Host} + [{n}/{N_{SPO}}]* C_{SPO} + [n/N_{IT}*C_{IT}] + C_{CTO} + C_{CEO} $$</div>
		<p> Where: </p>

		<table>
			<tr><td>$$ n $$</td><td> Number of nodes</td></tr>
			<tr><td>$$ C_{Host} $$</td><td> Cost of hosting</td></tr>
			<tr><td>$$ C_{SPO} $$</td><td> Cost of Staking Pool Operator</td></tr>
			<tr><td>$$ C_{IT} $$</td><td> Cost of IT Support</td></tr>
			<tr><td>$$ C_{CTO} $$</td><td> Cost of Chiff Technonogy Officer</td></tr>
			<tr><td>$$ C_{CEO} $$</td><td> Cost of Chiff Execution Officer</td></tr>
		</table>
		
		<div class="alert alert-primary row" role="alert">
			<div class="col-12 text-center">$$ Cost_{Maintain} $$ </div>
			<spam class="col-12 text-center" t-esc="state.costMaintain"></spam>
		</div>
	</section>`;

	class MaintainCost extends Component {
		static template = MaintainCost_TEMPLATE;
		state = useState({
			costMaintain: 0
		});

		constructor() {
			super()
			var costMaintain = 0;
			var n = this.env.networksDb.length -1;
			// Add network resource price
			this.env.networksDb.forEach(network => {
				if(network.id) {
					// Constant cost
					costMaintain += this.getResource(network).cost;
				}
			});
			
			// SPO cost
			var spo = this.getRole("SPO");
			costMaintain += Math.ceil(n / spo.throughput) * spo.cost;
			
			// IT cost
			var it = this.getRole("IT");
			costMaintain += Math.ceil(n / it.throughput) * it.cost;
			
			// CTO cost
			var cto = this.getRole("CTO");
			costMaintain += cto.cost;
			
			// CEO cost
			var ceo = this.getRole("CEO");
			costMaintain += ceo.cost;
			
			this.state.costMaintain = costMaintain;
		}
		
		getResource (network) {
			var list = this.env.resourcesDb.filter(resource => resource.name === network.nodeHardware );
			if(list.length) {
				return list[0]
			}
			console.warn("Resource with name " + network.nodeHardware + " not found");
		}
		
		getRole(abbreviation){
			var list = this.env.rolesDb.filter(role => role.abbreviation === abbreviation);
			if(list.length) {
				return list[0]
			}
			console.warn("Role with name " + abbreviation + " not found");
		}
	}


	// -------------------------------------------------------------------------
	// StakingRevenue
	// -------------------------------------------------------------------------
	const StakingRevenue_TEMPLATE = xml /* xml */`
	<section 
		class="container-fluid">
		<h2>Staking Revenue Stream</h2>
		<div>$$ Revenue_{Staking} = \SUM_{i=1}^{n} [
				( 30 / EPOCH^i ) * R_{Constant}^i + 
				(R_{Percentage}^i * Stake_{P2P}^i * APR^i)/12 + 
				(Stake_{Min}^i * APR^i)/12
			] * Token_{price}^i  $$</div>
		<p> Where: </p>

		<table>
			<tr><td>$$ n $$</td><td> Number of nodes</td></tr>
			<tr><td>$$ R_{Constant} $$</td><td> Constant revenue from the network</td></tr>
			<tr><td>$$ R_{Percentage} $$</td><td> Percentage of revenues from staker</td></tr>
			<tr><td>$$ Stake_{P2P}^i $$</td><td> Staked value on P2P</td></tr>
			<tr><td>$$ R_{Staking} $$</td><td> Revenue from our stake</td></tr>
			<tr><td>$$ APR^i $$</td><td> APR for a coin</td></tr>
			<tr><td>$$ EPOCH^i $$</td><td> EPOC for a coin</td></tr>
			<tr><td>$$ Token_{Price} $$</td><td>The price of a token</td></tr>
		</table>
		
		<div class="alert alert-primary row" role="alert">
			<div class="col-12 text-center">$$ Revenue_{Staking} $$ </div>
			<spam class="col-12 text-center" t-esc="state.revenueStaking"></spam>
		</div>
	</section>`;

	class StakingRevenue extends Component {
		static template = StakingRevenue_TEMPLATE;
		state = useState({
			revenueStaking: 0
		});

		constructor() {
			super()
			var revenueStaking = 0;
			this.env.networksDb.forEach(network => {
				if(network.id) {
					// Constant revenue
					revenueStaking += (30 * network.rewardConstant / network.epoch) * network.tokenPrice;
					revenueStaking += network.p2pStaked * network.rewardPercentage * network.apr / 12.0;
					revenueStaking += network.nodeStartValue * network.apr / 12.0;
					revenueStaking = revenueStaking * network.tokenPrice;
				}
			});
			this.state.revenueStaking = revenueStaking;
		}
	}


	// -------------------------------------------------------------------------
	// App Component
	// -------------------------------------------------------------------------
	const APP_TEMPLATE = xml /* xml */`
	<section 
		class="container-fluid py-5">
		<ResourceTable resources="env.resourcesDb" />
		<NetworkTable networks="env.networksDb" />
		<RolesTable roles="env.rolesDb" />

		<InitCost
			networks="env.networksDb"
			roles="env.rolesDb" 
			resources="env.resourcesDb"/>
		<MaintainCost
			networks="env.networksDb"
			roles="env.rolesDb" 
			resources="env.resourcesDb" />
		<StakingRevenue
			networks="env.networksDb"
			roles="env.rolesDb" 
			resources="env.resourcesDb"/>
	</section>`;

	class App extends Component {
		static template = APP_TEMPLATE;
		static components = {
			ResourceTable,
			RolesTable,
			NetworkTable,
			NetworkTableRow,
			InitCost,
			MaintainCost,
			StakingRevenue
		};

		constructor() {
			super();
		}
	}

	// Setup code
	function setup() {
		App.env.localStorage = window.localStorage;
		App.env.rolesDb = JSON.parse(document.getElementById('roles-data').textContent);
		App.env.networksDb = JSON.parse(document.getElementById('networks-data').textContent);
		App.env.resourcesDb = JSON.parse(document.getElementById('resources-data').textContent);
		const app = new App();
		app.mount(document.getElementById('calculatorBody'));
	}

	whenReady(setup);
})();
