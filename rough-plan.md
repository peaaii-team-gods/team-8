<!-- Working notes describing the intended multi-agent data-pipeline demonstration. -->
# Multi-Agent Data Pipeline

Goal: A multi-agent system that can discover, construct, validate, and maintain a data pipeline for a difficult to access or poorly structured dataset.

Instead of using AI just to analyze data or generate a script, the agent would actually perform the whole workflow of finding data, building and executing ingestion scripts, validating the results, and detecting or recovering from failures.

A key part of the system is explicit data contracts between pipeline stages. Each stage should have a defined input and output schema, documented assumptions, and clear expectations about how its data is represented and handled. Agents can help discover these contracts, identify inconsistencies, and propose corrections when schemas or source data change.

# Core demo:

- Define a data goal. Give the system a target dataset or describe the information we want to produce.

- Discover the source. Have the agent identify an appropriate data source and determine how to access it.

- Construct the pipeline. Generate the ingestion and transformation workflow using defined, inspectable operations.

- Establish data contracts. Define or infer the expected schemas at each stage, including required fields, types, and relevant data-quality constraints.

- Execute and validate. Run the pipeline, produce a usable structured output, and verify that each stage satisfies its contract.

- Demonstrate failure and recovery. Introduce a realistic problem, such as a changed source schema or malformed records. Show the system detect the issue, trace its impact, and attempt a bounded repair or clearly report the failure.

- Rerun and verify. Demonstrate that the corrected pipeline produces valid output and that its contracts remain enforceable.

# Potential use case

Hospital price-transparency data (MRFs), which can be large, inconsistent, and difficult to turn into usable structured data. Because we have encountered these challenges before, this domain could provide a realistic demonstration of source discovery, data normalization, schema validation, and pipeline maintenance.

To keep the project achievable, we should initially target *one manageable dataset* (doesn't necessarily have to be hospital data). 

# Agent responsibilities (may change over time)
We can divide the system into a small number of focused responsibilities:

Discovery agent: Identifies relevant sources and determines how to access the required data.

Pipeline construction agent: Plans the ingestion and transformation workflow.

Contract analysis agent: Defines or infers stage-level schemas, identifies incompatible assumptions, and proposes explicit contracts.

Validation and maintenance agent: Checks outputs, detects contract violations, diagnoses failures, and attempts permitted recovery.

These can be logical roles implemented within a shared orchestration system; they do not necessarily need to be separate models or independently running agents.

**Deterministic tools should perform actual ingestion, transformation, and validation wherever possible. Agent-generated plans and repairs should be checked before execution.```

# What we hope to see when done

- One data source and a small number of transformation stages.
- Explicit input and output contracts between stages.
- Agent-driven pipeline construction and execution.
- Deterministic schema and data-quality validation.
- One reproducible failure scenario, with demonstrated diagnosis and recovery or a clear failure report.
- An inspectable execution log and usable structured output.
