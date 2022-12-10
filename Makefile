ROOT := `pwd`

run:
ifndef DAY
	@echo "missinge DAY"
	@exit 1
endif
ifndef PART
	@echo "missinge PART"
	@exit 1
endif
ifdef INPUT
	$(ROOT)/run_solution $(DAY) $(PART) $(INPUT)
	@exit 0
else
	$(ROOT)/run_solution $(DAY) $(PART)
endif


