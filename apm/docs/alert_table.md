
# Muta alert table
## muta-node
<table>
<thead>
  <tr>
    <th>Panel </th>
    <th>Expression</th>
    <th>Level</th>
    <th>Thresholds</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td rowspan="2">$job：Overall total 5m load &amp; average CPU used%</td>
    <td>avg(1 - avg(irate(node_cpu_seconds_total{job=~"node_exporter",mode="idle"}[5m])) by (instance)) * 100</td>
    <td></td>
    <td>60%</td>
    <td>Over 60% utilization of CPU</td>
  </tr>
  <tr>
    <td>sum(node_load5{job=~"node_exporter"}) / count(node_cpu_seconds_total{job=~"node_exporter", mode='system'})</td>
    <td></td>
    <td>0.7</td>
    <td>CPU load5 greater than 0.7</td>
  </tr>
  <tr>
    <td>$job：Overall total memory &amp; average memory used%</td>
    <td>(sum(node_memory_MemTotal_bytes{job=~"node_exporter"} - node_memory_MemAvailable_bytes{job=~"node_exporter"}) / sum(node_memory_MemTotal_bytes{job=~"node_exporter"}))*100</td>
    <td></td>
    <td>70%</td>
    <td>Over 70% utilization of memory</td>
  </tr>
  <tr>
    <td>$job：Overall total disk &amp; average disk used%</td>
    <td>(sum(avg(node_filesystem_size_bytes{job=~"node_exporter",fstype=~"xfs|ext.*"})by(device,instance)) - sum(avg(node_filesystem_free_bytes{job=~"node_exporter",fstype=~"xfs|ext.*"})by(device,instance))) *100/(sum(avg(node_filesystem_avail_bytes{job=~"node_exporter",fstype=~"xfs|ext.*"})by(device,instance))+(sum(avg(node_filesystem_size_bytes{job=~"node_exporter",fstype=~"xfs|ext.*"})by(device,instance)) - sum(avg(node_filesystem_free_bytes{job=~"node_exporter",fstype=~"xfs|ext.*"})by(device,instance))))</td>
    <td></td>
    <td>70%</td>
    <td>Over 70% utilization of disk</td>
  </tr>
  <tr>
    <td>CPU% Basic</td>
    <td>(1 - avg(irate(node_cpu_seconds_total{mode="idle"}[5m])) by (instance)) *100</td>
    <td></td>
    <td>60%</td>
    <td>Node CPU utilization exceeds 70%</td>
  </tr>
  <tr>
    <td>Memory Basic</td>
    <td>(1 - (node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes))* 100</td>
    <td></td>
    <td>70%</td>
    <td>Node memory utilization exceeds 70%</td>
  </tr>
  <tr>
    <td>System Load</td>
    <td>sum(node_load5) by (instance) / count(node_cpu_seconds_total{job=~"node_exporter", mode='system'}) by (instance)</td>
    <td></td>
    <td>0.7</td>
    <td>Node CPU load5 greater than 0.7</td>
  </tr>
  <tr>
    <td>Disk Space Used% Basic</td>
    <td>(node_filesystem_size_bytes{fstype=~"ext.*|xfs",mountpoint !~".*pod.*"}-node_filesystem_free_bytes{fstype=~"ext.*|xfs",mountpoint !~".*pod.*"}) *100/(node_filesystem_avail_bytes {fstype=~"ext.*|xfs",mountpoint !~".*pod.*"}+(node_filesystem_size_bytes{fstype=~"ext.*|xfs",mountpoint !~".*pod.*"}-node_filesystem_free_bytes{fstype=~"ext.*|xfs",mountpoint !~".*pod.*"}))</td>
    <td></td>
    <td>70%</td>
    <td>Node disk utilization exceeds 70%</td>
  </tr>
  <tr>
    <td>Time Spent Doing I/Os</td>
    <td>irate(node_disk_io_time_seconds_total{instance=~"(.*):9100"}[5m])</td>
    <td></td>
    <td>80%</td>
    <td>Node I/Os utilization exceeds 80%</td>
  </tr>
  <tr>
    <td>Muta Status</td>
    <td>up{job="muta_exporter"} == 0</td>
    <td></td>
    <td>1</td>
    <td>MUTA service status is down</td>
  </tr>
  <tr>
    <td>Node Status</td>
    <td>up{job="node_exporter"} == 0</td>
    <td></td>
    <td>1</td>
    <td>node_exporter service status is down</td>
  </tr>
  <tr>
    <td>Promethues Status</td>
    <td>up{job="prometheus"} == 0</td>
    <td></td>
    <td>1</td>
    <td>Promethues service status is down</td>
  </tr>
  <tr>
    <td>Promtail Status</td>
    <td>count(count_over_time({job="muta"}[5m])) by (hostip)</td>
    <td></td>
    <td>1</td>
    <td>Promtail service status is down</td>
  </tr>
  <tr>
    <td rowspan="2">Jaeger Status</td>
    <td>up{instance=~"(.*):16687"} == 0</td>
    <td></td>
    <td>1</td>
    <td>jaeger-query service status is down</td>
  </tr>
  <tr>
    <td>up{instance=~"(.*):14269"} == 0</td>
    <td></td>
    <td>1</td>
    <td>jaeger-collector service status is down</td>
  </tr>
</tbody>
</table>


## muta-benchmark
<table>
<thead>
  <tr>
    <th>Panel </th>
    <th>Expression</th>
    <th>Level</th>
    <th>Thresholds</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>TPS</td>
    <td>avg(rate(muta_consensus_committed_tx_total[5m]))</td>
    <td></td>
    <td>0</td>
    <td>TPS is zero</td>
  </tr>
  <tr>
    <td>exec_p90</td>
    <td>avg(histogram_quantile(0.90, sum(rate(muta_consensus_time_cost_seconds_bucket{type="exec"}[5m])) by (le, instance)))</td>
    <td></td>
    <td>2.4</td>
    <td>exec_90 greater than 2.4s</td>
  </tr>
  <tr>
    <td>consensus_round_cost</td>
    <td>(muta_consensus_round &gt; 0 )</td>
    <td></td>
    <td>3</td>
    <td>More than 3 rounds of consensus</td>
  </tr>
  <tr>
    <td>consensus_p90</td>
    <td>avg(histogram_quantile(0.90, sum(rate(muta_consensus_duration_seconds_bucket[5m])) by (le, instance))) / avg(histogram_quantile(0.90, sum(rate(muta_consensus_time_cost_seconds_bucket{type="exec"}[5m])) by (le, instance))) </td>
    <td></td>
    <td>1.1</td>
    <td>exec time is greater than consensus time</td>
  </tr>
  <tr>
    <td rowspan="2">Liveness</td>
    <td>increase(muta_consensus_height{job="muta_exporter"}[1m])</td>
    <td></td>
    <td>0</td>
    <td rowspan="2">Loss of Liveness</td>
  </tr>
  <tr>
    <td>up{job="muta_exporter"} == 1</td>
    <td></td>
    <td>1</td>
  </tr>
  <tr>
    <td>synced_block</td>
    <td>changes(muta_consensus_sync_block_total[10m]) / changes(muta_consensus_height [10m]) </td>
    <td></td>
    <td>1/1000?</td>
    <td>todo</td>
  </tr>
  <tr>
    <td>Connected Consensus Peers</td>
    <td>(sum(muta_network_tagged_consensus_peers<br>) by (instance) - 1)<br>- sum(muta_network_connected_consensus_peers) by (instance)</td>
    <td></td>
    <td>1</td>
    <td>Consensus Network Disconnect</td>
  </tr>
</tbody>
</table>