from datetime import datetime

# database-like repository for demo data

class DemoUser:

    raw_transactions = [
                {
                    'id': '1234567890A',
                    'amount': 4663,
                    'balance': 145337,
                    'description': 'VISA DEBIT 00712 AMAZON 393411672 NY',
                    'date': '2021-02-10'
                },
                {
                    'id': '1234567891B',
                    'amount': 3630,
                    'balance': 141707,
                    'description': 'VISA DEBIT 00527 NETFLIX 834740255 NY',
                    'date': '2021-02-10'
                },
                {
                    'id': '1234567892C',
                    'amount': 4145,
                    'balance': 137562,
                    'description': 'VISA DEBIT 00370 TARGET 250574308 NY',
                    'date': '2021-02-10'
                },
                {
                    'id': '1234567893D',
                    'amount': 7631,
                    'balance': 129931,
                    'description': 'VISA DEBIT 00879 WALGREENS 805066729 NY',
                    'date': '2021-02-10'
                },
                {
                    'id': '1234567894E',
                    'amount': 4180,
                    'balance': 125751,
                    'description': 'VISA DEBIT 00742 UBER 673852706 NY',
                    'date': '2021-10-25'
                },
                {
                    'id': '1234567895F',
                    'amount': 4391,
                    'balance': 121360,
                    'description': 'VISA DEBIT 00712 GOOGLE 530078024 NY',
                    'date': '2021-03-23'
                },
                {
                    'id': '1234567896G',
                    'amount': 4157,
                    'balance': 117203,
                    'description': 'VISA DEBIT 00644 UBER 131500425 NY',
                    'date': '2021-01-02'
                },
                {
                    'id': '1234567897H',
                    'amount': 585,
                    'balance': 116618,
                    'description': 'VISA DEBIT 00399 GOOGLE 415688758 NY',
                    'date': '2021-03-18'
                },
                {
                    'id': '1234567898I',
                    'amount': 2121,
                    'balance': 114497,
                    'description': 'VISA DEBIT 00902 AMAZON 556464654 NY',
                    'date': '2021-09-13'
                },
                {
                    'id': '1234567899J',
                    'amount': 2543,
                    'balance': 111954,
                    'description': 'VISA DEBIT 00258 TARGET 153498519 NY',
                    'date': '2021-05-02'
                },
                {
                    'id': '1234567890K',
                    'amount': 2594,
                    'balance': 109360,
                    'description': 'VISA DEBIT 00619 CHICKFILA 858364226 NY',
                    'date': '2021-01-08'
                },
                {
                    'id': '1234567891L',
                    'amount': 1751,
                    'balance': 107609,
                    'description': 'VISA DEBIT 00616 BESTBUY 821622090 NY',
                    'date': '2021-09-09'
                },
                {
                    'id': '1234567892M',
                    'amount': 1895,
                    'balance': 105714,
                    'description': 'VISA DEBIT 00647 AMAZON 219283233 NY',
                    'date': '2021-12-04'
                },
                {
                    'id': '1234567893N',
                    'amount': 8564,
                    'balance': 97150,
                    'description': 'VISA DEBIT 00674 APPLE 512150903 NY',
                    'date': '2021-04-11'
                },
                {
                    'id': '1234567894O',
                    'amount': 6843,
                    'balance': 90307,
                    'description': 'VISA DEBIT 00682 SPOTIFY 276629566 NY',
                    'date': '2021-06-19'
                },
                {
                    'id': '1234567895P',
                    'amount': 2688,
                    'balance': 87619,
                    'description': 'VISA DEBIT 00144 DELTA 385910141 NY',
                    'date': '2021-03-20'
                },
                {
                    'id': '1234567896Q',
                    'amount': 2760,
                    'balance': 84859,
                    'description': 'VISA DEBIT 00670 STARBUCKS 329346183 NY',
                    'date': '2021-08-23'
                },
                {
                    'id': '1234567897R',
                    'amount': 1788,
                    'balance': 83071,
                    'description': 'VISA DEBIT 00217 AMAZON 578154814 NY',
                    'date': '2021-11-23'
                },
                {
                    'id': '1234567898S',
                    'amount': 1326,
                    'balance': 81745,
                    'description': 'VISA DEBIT 00281 BESTBUY 339919756 NY',
                    'date': '2021-10-28'
                },
                {
                    'id': '1234567899T',
                    'amount': 6542,
                    'balance': 75203,
                    'description': 'VISA DEBIT 00263 CVS 949259894 NY',
                    'date': '2021-06-11'
                }
            ]
    detailed_transactions = [
            {
                'id': '1234567899T',
                'entry_type': 'scanned_receipt',
                'details': {
                    'items': {
                        'Coca cola 591ml':3.99,
                        'doritos nacho': 2.89,
                        'haribo cola': 2.70
                    },
                    'remarks': 'User repeatedly buys junk food.'
                }
            },
            {
                'id': '1234567897R',
                'entry_type': 'scanned_receipt',
                'details': {
                    'items': {
                        'SAJAPPQ Phone holder': 17.88
                    },
                    'remarks': 'User has a history of buying unnecessary items.'
                }
            },
        ]
    
    user_chatbot_pref = [
        "User has bad spending habits.",
    ]

    @staticmethod
    def get_raw_transactions():
        return DemoUser.raw_transactions
    
    @staticmethod
    def get_detailed_transactions():
        return DemoUser.detailed_transactions
    
    @staticmethod
    def get_transaction_summary():
        return {
            'total_transactions': len(DemoUser.raw_transactions),
            'total_amount': sum([transaction['amount'] for transaction in DemoUser.raw_transactions]),
            'summary': DemoUser.summary_transactions(DemoUser.raw_transactions)
        }
    
    @staticmethod
    def get_transaction_summary(start, end):
        start_date = datetime.strptime(start, '%Y-%m-%d')
        end_date = datetime.strptime(end, '%Y-%m-%d')

        filtered_transactions = [
            transaction for transaction in DemoUser.raw_transactions
            if start_date <= datetime.strptime(transaction['date'], '%Y-%m-%d') <= end_date
        ]

        return {
            'total_transactions': len(filtered_transactions),
            'total_amount': sum([transaction['amount'] for transaction in filtered_transactions]),
            'summary': DemoUser.summary_transactions(filtered_transactions)
        }
    
    @staticmethod
    def get_memory():
        return DemoUser.user_chatbot_pref

    @staticmethod
    def summary_transactions(transactions):
        summary = ''
        for transaction in transactions:
            date = transaction['date']
            amount = transaction['amount'] / 100
            description = transaction['description']
            merchant = description.split()[-3]
            summary += f"{date} {amount:.2f} at {merchant}, "

        return summary.strip()
    
    @staticmethod
    def get_user():
        return {
            'name': 'John Doe',
            'email': 'johndoe@mail.com',
            'phone': '123-456-7890'
        }
    
    @staticmethod
    def get_user_id():
        return 1
    
    