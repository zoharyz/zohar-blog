# POC Framework: Essays + Code

## Philosophy

Each essay explores an idea. Many ideas are better understood through code. Build the POC *while* thinking through the essay, not after. The code teaches you what's true, the essay teaches readers why it matters.

## Repository Structure per Essay

For each essay, create a dedicated GitHub repository with this structure:

```
zohar-essay-[kebab-case-title]/
├── README.md                 # Overview, what this POC teaches
├── requirements.txt          # Python dependencies
├── pyproject.toml           # Modern Python project config
├── src/                     # Main implementation
│   ├── __init__.py
│   ├── main.py             # Entry point / core logic
│   └── [feature].py        # Organized by feature
├── examples/               # Runnable examples
│   ├── basic_usage.py      # Simplest case
│   ├── advanced.py         # More complex scenario
│   └── performance.py      # Benchmarks if relevant
├── tests/                  # Unit/integration tests
│   ├── __init__.py
│   └── test_*.py
├── docs/                   # Extra documentation
│   └── architecture.md     # How it's designed
└── .github/
    └── workflows/          # GitHub Actions CI (optional)
```

## Example Repos (Based on Editorial Calendar)

### 1. `zohar-essay-agentic-systems`
**Essay**: "Agentic AI Systems vs. Single LLM Architectures"

```
src/
├── agent.py              # Base agent class
├── orchestrator.py       # Coordinates multiple agents
├── tools.py              # Tool definitions for agents
└── models.py             # Model abstraction layer

examples/
├── basic_usage.py        # Single agent doing one thing
├── multi_agent.py        # Two agents collaborating
└── supervisor.py         # Agent with supervisor pattern
```

**POC teaches**: How to architect agent systems, tool interfaces, orchestration patterns

---

### 2. `zohar-essay-context-engineering`
**Essay**: "Context Engineering is the New API Design"

```
src/
├── vector_store.py       # Vector DB abstraction
├── rag.py                # Retrieval-augmented generation
├── context_manager.py    # How to structure & inject context
└── chunking.py           # Text splitting strategies

examples/
├── simple_qa.py          # Basic RAG query
├── context_optimization.py # How context structure affects results
└── context_tracing.py    # Observing what context is used
```

**POC teaches**: How context affects LLM behavior, RAG patterns, context design choices

---

### 3. `zohar-essay-observability-ai`
**Essay**: "Observability for AI: Monitoring Systems That Behave Like People"

```
src/
├── tracer.py             # Trace LLM calls
├── metrics.py            # Metrics for probabilistic systems
├── instrumentation.py    # What to instrument
└── analysis.py           # Analyzing traces

examples/
├── basic_tracing.py      # Instrument a simple agent
├── trace_analysis.py     # Analyzing a failed agent run
└── observability_dashboard.py # Simple metrics view
```

**POC teaches**: How to instrument LLM systems, what's observable, tracing patterns

---

### 4. `zohar-essay-serverless-first`
**Essay**: "Why Serverless-First Isn't About Servers"

```
src/
├── handlers.py           # Event handler functions
├── router.py             # Route events to handlers
├── state.py              # Stateless vs stateful patterns
└── cold_start.py         # Performance under load

examples/
├── basic_handler.py      # Simplest function
├── chained_handlers.py   # Async event chains
└── performance_test.py   # Cold start measurements
```

**POC teaches**: Event-driven architecture, function composition, cold start tradeoffs

---

## POC Scope Guidelines

### What Makes a Medium POC (1000-2000 lines)

✅ **Include**:
- Working, runnable code (you can `python src/main.py`)
- 2-3 realistic examples showing different usage patterns
- Error handling for real failure cases
- Basic tests (not exhaustive, but cover main paths)
- Clean abstractions (not toy code)
- Documentation on setup and running examples

✅ **Don't Include**:
- Production deployment infrastructure
- Exhaustive error handling for edge cases
- Full test coverage (60-70% is fine)
- Performance optimization premature to the lesson
- Unrelated features

### Scope Rules

- **One core concept per POC**: "How to structure agents" not "Build a complete AI system"
- **Runnable without secrets**: Use local models, mocked APIs, or public data
- **Fast to understand**: Experienced engineer should understand code in 20 mins
- **Realistic patterns**: Show how you'd actually write this, not toy versions

### Example Scope: Agentic Systems

**In scope**:
- Base agent class
- Tool interface
- Simple orchestrator (sequential + parallel)
- Examples: agent does one task, two agents collaborate
- Observability: trace what agents are doing

**Out of scope**:
- Production-grade error recovery
- Distributed agent coordination across services
- Fine-tuned prompts for specific domains
- Cost optimization
- Advanced prompt engineering techniques

## Code-to-Essay Workflow

### Phase 1: Discovery (Week 1)
1. Start with a small prototype (200-300 lines)
2. Try different approaches, see what breaks
3. Learn what the trade-offs actually are
4. **This teaches you what to write about**

### Phase 2: POC (Week 1-2)
1. Refactor into clean, documented code
2. Add examples showing different usage patterns
3. Write tests for the core logic
4. Create a README explaining the architecture

### Phase 3: Essay (Week 2)
1. Extract code snippets from the POC
2. Use real insights from building
3. Explain the "why" behind the code design
4. Reference the full POC repo for readers who want to dig deeper

### Phase 4: Publish (Week 2)
1. Publish essay with embedded code snippets
2. Link to full repo: "Full code and examples at github.com/zoharyz/zohar-essay-[name]"
3. Make sure the POC is documented and runnable

## Naming Conventions

**Essay repos**: `zohar-essay-[kebab-case-topic]`

Examples:
- `zohar-essay-agentic-systems`
- `zohar-essay-context-engineering`
- `zohar-essay-serverless-first`
- `zohar-essay-observability-ai`

**All repos are public** so readers can explore the code while reading the essay.

## Integration with Blog

### In your essay, link like this:

```markdown
You can see the full implementation in the accompanying POC:
[github.com/zoharyz/zohar-essay-agentic-systems](https://github.com/zoharyz/zohar-essay-agentic-systems)

The key abstraction is the Agent class:

[code snippet from src/agent.py]

You can run this example:
```bash
git clone https://github.com/zoharyz/zohar-essay-agentic-systems
cd zohar-essay-agentic-systems
pip install -r requirements.txt
python examples/multi_agent.py
```
```

## What Gets Shared in Essays vs. Repos

### In Essay:
- Key code snippets (30-50 lines max per snippet)
- Explain the pattern, not implementation details
- Show the "aha" moments

### In Repo:
- Full, working implementation
- Multiple examples showing variation
- Tests demonstrating usage
- Performance characteristics
- Edge cases handled

## Dependencies & Tooling

### Standard Stack
```
Python 3.11+
pytest              # Testing
black               # Code formatting
mypy                # Type checking
ruff                # Linting
```

### AI-Oriented POCs
```
langchain or llama-index  # LLM frameworks (if needed)
openai / anthropic        # API clients (optional, can use mocks)
numpy / pandas            # Data handling
```

### Server-Oriented POCs
```
fastapi or flask          # Web framework (if needed)
asyncio                   # Async patterns
sqlalchemy                # DB abstraction (if needed)
```

## First POC: Suggested Topics

**Ranked by "good first POC"**:

1. **Agentic Systems** ⭐⭐⭐
   - Clear concept to build
   - Shows architectural patterns
   - Interesting without complexity
   - ~1500 lines of code

2. **Context Engineering** ⭐⭐⭐
   - Practical, immediately useful
   - Shows real RAG patterns
   - Good learning curve
   - ~1200 lines of code

3. **Observability for AI** ⭐⭐
   - More about instrumentation than code
   - Lighter implementation
   - ~800 lines of code (easy to expand)

4. **Serverless-First** ⭐⭐
   - Needs more AWS/GCP knowledge
   - Less portable
   - Better once you have 1-2 POCs done

## Checklist for a POC

Before publishing a POC repo:

- [ ] Code runs without secrets or credentials
- [ ] README explains what this teaches
- [ ] Requirements.txt is correct and minimal
- [ ] Examples are runnable (`python examples/*.py` works)
- [ ] Code passes `black`, `mypy`, `ruff` checks
- [ ] Tests pass: `pytest tests/`
- [ ] Key classes have docstrings
- [ ] Architecture document explains design choices
- [ ] Links back to the essay

## Timeline for First Essay + POC

**Week 1**:
- Mon-Tue: Build POC (discovery + implementation)
- Wed: Write POC tests and examples
- Thu: Polish code, write README

**Week 2**:
- Mon-Tue: Write essay (extract insights from POC)
- Wed: Review essay against code, make sure they align
- Thu: Publish essay + POC repo

## Examples of Code in Essays

**Good snippet** (shows the pattern):
```python
class Agent:
    def __init__(self, name: str, tools: list[Tool]):
        self.name = name
        self.tools = {tool.name: tool for tool in tools}
    
    async def run(self, task: str) -> str:
        response = await self.llm.think(task, tools=self.tools)
        return await self.execute(response)
```

**Bad snippet** (too short, doesn't show the idea):
```python
agent = Agent("my-agent", tools)
result = agent.run("do something")
```

**Bad snippet** (too long, distracts from the point):
```python
[50 lines of production error handling]
```

## Next Steps

1. Pick your first essay + POC (recommend: Agentic Systems)
2. Create the repo with the structure above
3. Start building the POC
4. Write as you build
5. Publish POC repo and essay together

---

This framework ensures your POCs teach something concrete while your essays explain why it matters.
